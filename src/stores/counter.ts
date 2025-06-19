import {computed, type Ref, ref} from 'vue'
import { defineStore } from 'pinia'
import {type ICell, createField} from "@/shared/utils/createField.ts";
import {randomNum} from "@/shared/utils/randomNum.ts";
import {useTimerStore} from "@/stores/timer.ts";

export const useSapperStore = defineStore('sapper', () => {
  const timerStore = useTimerStore();

  const gameStatus: Ref<'win'| 'lose'| 'ready' | 'play'> = ref('ready')
  const bombs: Ref<number> = ref(10);
  const columns = ref(8)
  const rows = ref(8)

  const flags = computed(() => {
    let setFlags = 0;
    fieldOfCells.value.forEach((row) => {
      row.forEach(({flag}) => {
        if (flag) setFlags++;
      })
    })
    return setFlags
  })

  const differenceBombsAndFlags = computed(() => {
    return bombs.value - flags.value
  })

  const cellsLeft = computed(() => {
    let cells = 0;
    fieldOfCells.value.forEach((row) => {
      row.forEach(({visible}) => {
        if (!visible) cells++;
      })
    })
    if (cells <= bombs.value) {
      gameStatus.value = 'win'
    }
    return cells
  })


  const fieldOfCells = ref<ICell[][]>(createField(columns.value, rows.value))

  function updateField() {
    fieldOfCells.value = createField(columns.value, rows.value)
    gameStatus.value = 'ready';
    timerStore.resetTimer();
  }

  function changeColumns (newColumns: number) {columns.value = newColumns}
  function changeRows (newRows: number) {rows.value = newRows}
  function changeBombs (newBombs: number) {bombs.value = newBombs}

  function handleCellClick(row: number, col: number) {
    if (gameStatus.value === 'lose') return
    if (gameStatus.value === 'win') return
    if (fieldOfCells.value[row][col].visible) return
    if (fieldOfCells.value[row][col].flag) return
    if (gameStatus.value === 'ready') {
      timerStore.startTimer();
      gameStatus.value = 'play'
      placeBombs(row,col);
    }

    if (fieldOfCells.value[row][col].type == 'bomb') {
      gameStatus.value = 'lose'
      timerStore.stopTimer();
      return
    }
    cellDeployment(row, col);
  }

  function handleCellRightClick (row: number, col: number) {
    if (gameStatus.value === 'lose') return
    if (gameStatus.value === 'win') return
    if (fieldOfCells.value[row][col].visible) return
    const newField = [...fieldOfCells.value]
    newField[row] = [...newField[row]]

    newField[row][col] = {
      ...newField[row][col],
      flag: !newField[row][col].flag
    }

    fieldOfCells.value = newField
  }

  function placeBombs (row: number, col: number) {
    let bombsInstalled = 0;

    while (bombsInstalled < bombs.value) {
      const x = randomNum(0, columns.value);
      const y = randomNum(0, rows.value);

      if (
        (row !== y && col !== x) &&
        !fieldOfCells.value[row][col].visible &&
        fieldOfCells.value[y][x].type !== "bomb"
      ) {
        const newField = [...fieldOfCells.value]
        newField[y] = [...newField[y]]

        newField[y][x] = {
          ...newField[y][x],
          type: 'bomb'
        }
        fieldOfCells.value = newField
        bombsInstalled++
      }
    }
  }

  const cellDeployment = (y:number, x: number) => {
    const newField = [...fieldOfCells.value]
    newField[y] = [...newField[y]]

    newField[y][x] = {
      ...newField[y][x],
      visible: true
    }

    fieldOfCells.value = newField

    cellCheck(y,x);

  };

  const cellCheck = (y:number, x: number) => {

    let neighbours = 0;
    const emptyArr: [number,number][] = []
    if (y-1>=0 && x-1>=0) {
      if (fieldOfCells.value[y-1][x-1].type == 'bomb') {
        neighbours++
      } else if (!fieldOfCells.value[y-1][x-1].visible){
        emptyArr.push([y-1,x-1])
      }
    }
    if (y-1>=0) {
      if (fieldOfCells.value[y-1][x].type == 'bomb') {
        neighbours++
      } else if (!fieldOfCells.value[y-1][x].visible){
        emptyArr.push([y-1,x])
      }
    }
    if (y-1>=0 && x+1<columns.value) {
      if (fieldOfCells.value[y-1][x+1].type == 'bomb') {
        neighbours++
      } else if (!fieldOfCells.value[y-1][x+1].visible) {
        emptyArr.push([y-1,x+1])
      }
    }
    if (x-1>=0) {
      if (fieldOfCells.value[y][x-1].type == 'bomb') {
        neighbours++
      } else if (!fieldOfCells.value[y][x-1].visible) {
        emptyArr.push([y,x-1])
      }
    }
    if (x+1<columns.value) {
      if (fieldOfCells.value[y][x+1].type == 'bomb') {
        neighbours++
      } else if (!fieldOfCells.value[y][x+1].visible) {
        emptyArr.push([y,x+1])
      }
    }
    if (y+1<rows.value && x-1>=0) {
      if (fieldOfCells.value[y+1][x-1].type == 'bomb') {
        neighbours++
      } else if (!fieldOfCells.value[y+1][x-1].visible) {
        emptyArr.push([y+1,x-1])
      }
    }
    if (y+1<rows.value) {
      if (fieldOfCells.value[y+1][x].type == 'bomb') {
        neighbours++
      } else if (!fieldOfCells.value[y+1][x].visible) {
        emptyArr.push([y+1,x])
      }
    }
    if (y+1<rows.value && x+1<columns.value) {
      if (fieldOfCells.value[y+1][x+1].type == 'bomb') {
        neighbours++
      } else if (!fieldOfCells.value[y+1][x+1].visible) {
        emptyArr.push([y+1,x+1])
      }
    }

    if (neighbours) {
      const newField = [...fieldOfCells.value]
      newField[y] = [...newField[y]]

      newField[y][x] = {
        ...newField[y][x],
        environment: neighbours,
        visible: true,
        flag: false
      }

      fieldOfCells.value = newField
    } else {
      const newField = [...fieldOfCells.value]
      newField[y] = [...newField[y]]

      newField[y][x] = {
        ...newField[y][x],
        visible: true
      }

      fieldOfCells.value = newField

      emptyArr.forEach(([y,x]) => {
        cellCheck(y,x)
      })
    }
  };

  return {
    columns,
    rows,
    changeColumns,
    changeRows,
    changeBombs,
    fieldOfCells,
    updateField,
    handleCellClick,
    handleCellRightClick,
    gameStatus,
    bombs,
    flags,
    differenceBombsAndFlags,
    cellsLeft
  }
})
