import { CardWrapper } from "@/components/auth/card-wrapper"

const ErrorCard = () => {
  return (
    <CardWrapper
          headerLabel="Oops! Something went wrong!"
          backButtonLabel="Back to login"
          backButtonHref="/auth/login"
          children={undefined} showSocial={false}    />

  )
}

export default ErrorCard