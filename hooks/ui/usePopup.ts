import {useState} from "react";

export const usePopup = (initialMode = false) => {
    const [popupOpen, setPopupOpen] = useState(initialMode)

    const toggle = () => setPopupOpen(!popupOpen)

    return [popupOpen, setPopupOpen, toggle]
}