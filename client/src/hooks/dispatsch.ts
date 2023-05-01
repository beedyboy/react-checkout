import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'

type Dispatch = () => AppDispatch
export const useAppDispatch: Dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector