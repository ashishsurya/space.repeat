import { Card, CardHeader } from "./ui/card"

interface StackCardProps {
  title: string
}


export const StackPreview : React.FC<StackCardProps> = ({title}) => {
  return (
    <Card>
      <CardHeader>
        {title}
      </CardHeader>
    </Card>
  )
}
