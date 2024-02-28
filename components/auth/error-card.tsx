import { CardWrapper } from "./card-wrapper";
import { CiWarning } from "react-icons/ci";

export const ErrorCard = () => {
    return (
        <CardWrapper
            header="Ooops! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full items-center flex justify-center">
                <CiWarning className="text-destructive text-2xl"/>
            </div>
        </CardWrapper>
    )
}