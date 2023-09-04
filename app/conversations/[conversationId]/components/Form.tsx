"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import MessageInput from "./MessageInput";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/message", {
      ...data,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <HiPhoto size={30} className="text-sky-500" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder="Type a message"
          required
        />
        <button 
        type="submit" 
        className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
            <HiPaperAirplane 
                size={18}
                className="text-white"
            />
        </button>
      </form>
    </div>
  );
};

export default Form;
