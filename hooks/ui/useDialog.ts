import {useState} from "react";

export const useDialog = (initialMode = false) => {
    const [dialogOpen, setDialogOpen] = useState(initialMode)
    const toggle = () => setDialogOpen(!dialogOpen)
    return [dialogOpen, setDialogOpen, toggle]
}