import React, {useEffect, useMemo, useState} from "react";
import {useSudoku, UseSudoku} from "../hooks/useSudoku";
import {Cell} from "../types/Cell";
import {Optional} from "typescript-optional";
import {Coordinate} from "../types/Coordinate";
import {useZone} from "../hooks/useZone";
import {useBoard, UseBoard} from "../hooks/useBoard";
import {useSave} from "../hooks/useSave";
import {useLoad} from "../hooks/useLoad";

export interface ISudokuContext {
    // The current cell selected for the user, this cell can be null
    // if the user not selected any cell or the state of application
    // is beginning to run.
    currentCell: Optional<Cell>,
    // Function used for change the current cell selected for the user,
    // the use of this function produce a new render, the parameter of
    // this function can be null for indicate that the user not has
    // selected any cell.
    setCurrentCell: (cell: Optional<Cell>) => void,
    getCellAt: (coordinateOfZone: Coordinate, coordinateOfCell: Coordinate) => Cell,
    getZoneAt: (coordinate: Coordinate) => Cell[],
    getHashBoard: () => string,
    // Function used for change the value of cell in the board, is needed
    // provider the coordinate of cell and the new value.
    setValueOfCell: (coordinateOfCell: Coordinate, value: number) => void,
    loadBoardByHash: (hashByUser: string) => void
}

export const SudokuContext = React.createContext<ISudokuContext>({
    // The initial state of cell is null, the user not selected any cell
    // when the application start.
    currentCell: Optional.empty(),
    // Emit a warning if the developer try to use this function in the
    // current state.
    setCurrentCell: () => console.warn("Not Implemented"),
    // Emit a warning if the developer try to use this function in the
    // current state.
    getCellAt: () => {
        console.warn("Not Implemented")
        return new Cell(-1, -1, false, 0);
    },
    getZoneAt: () => {
        console.warn("Not Implemented")
        return []
    },
    getHashBoard: () => {
        console.warn("Not Implemented")
      return "";
    },
    // Emit a warning if the developer try to use this function in the
    // current state.
    setValueOfCell: () => console.warn("Not Implemented"),
    loadBoardByHash: () => console.warn("Not Implemented"),
})

interface ISudokuProvider {
    // Generally, more context or the principal content of application
    children: React.ReactNode,
}

export function SudokuProvider(props: ISudokuProvider) {
    // Manager for the current board of Sudoku and the solution board
    // of current board Sudoku.
    // Generally the Sudoku is instanced immediately to start the application.
    // Use of useMemo for avoid generate a new sudoku each interaction
    // of user with the state global of Context.
    const [boardRaw, solutionRaw]: UseSudoku = useMemo(() => useSudoku(), [])

    const [board, setBoard] = useState<UseBoard>(useBoard(boardRaw));
    // The initial state of cell is null, the user not selected any cell
    // when the application start.
    const [currentCell, setCurrentCell] = useState<Optional<Cell>>(Optional.empty())

    useEffect(() => {
        if (board.isFill()) {
            if (board.isValid(solutionRaw)) {
                console.log("Yes!!!, Valid Solution")
            } else {
                console.log("Oppss!!! Not valid")
            }
        }
    }, [board])

    const getCellAt = (coordinateOfZone: Coordinate, coordinateOfCell: Coordinate): Cell => {
        const zone: Cell[] = board.getZone(coordinateOfZone);
        return useZone(zone).getCell(coordinateOfCell);
    }

    const getZoneAt = (coordinate: Coordinate): Cell[] => {
        return board.getZone(coordinate);
    }

    const getHashBoard = () => {
        return useSave(boardRaw)
    }

    const setValueOfCell = (coordinateOfCell: Coordinate, value: number) => {
        const cells: Optional<Cell[]> = board.setCellValueAt(coordinateOfCell, value);
        if (cells.isPresent()) {
            setBoard(useBoard(boardRaw, cells.get()));
        }
    }

    const loadBoardByHash = (hashByUser: string) => {
        const {board, hash} = useLoad(hashByUser);
        // The hash generated for the board and the hash provider for the
        // user must be the same.
        if (hashByUser === hash) {
            setBoard(useBoard(board))
        } else {
            console.error("The comprobation of hash has been failed, not are equals")
        }
    }

    return (
        <SudokuContext.Provider value={{
            currentCell,
            getCellAt,
            getZoneAt,
            getHashBoard,
            setCurrentCell,
            setValueOfCell,
            loadBoardByHash,
        }}>
            {props.children}
        </SudokuContext.Provider>
    )
}