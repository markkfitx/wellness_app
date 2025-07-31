export default function Box({
  children,
  style = "",
}: {
  children?: React.ReactNode
  style?: string
}) {
  return (
    <div className={`bg-primary-foreground p-4 rounded-lg ${style}`}>
      {children}
    </div>
  )
}