type BottomSheetRefType<T> = {
    toggle: ()=> void,
    close: (result?: T) => void,
    open: ()=>void
}

export default BottomSheetRefType;