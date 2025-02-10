import { Stack } from "@chakra-ui/react"
import AddCalorie from "./addcalorie"
import ShowCalorie from "./showcalorie"


const CalorieIndex = () => {

    return (
        <Stack spacing={8} direction='column'>
            <AddCalorie />
            <ShowCalorie />
        </Stack>
    )
}

export default CalorieIndex