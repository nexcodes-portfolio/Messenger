"use client";

import {User} from "@prisma/client"
import {useRouter} from "next/navigation"
import { useState } from "react";
import {useForm , FieldValues} from "react-hook-form"

interface SettingsModelProps {
    isOpen?: boolean
    onClose: ()=> void
    currentUser: User
}

const SettingsModel: React.FC<SettingsModelProps> = ({
    isOpen,
    onClose,
    currentUser
}) => {

    const router = useRouter()
    const [isLoading , setIsLoading] = useState(false)

    const {
        register.
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })

    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image' , result?.info?.secure?.url)
    }

  return (
    <div>SettingsModel</div>
  )
}

export default SettingsModel