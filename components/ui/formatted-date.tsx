const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function FormattedDate({
  date,
  ...props
}: React.ComponentPropsWithoutRef<'time'> & { date?: string | Date | null }) {
  if (!date) {
    return <time {...props}></time>; // Handle missing date gracefully
  }

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    return <time {...props}>Invalid Date</time>; // Handle invalid date
  }

  return (
    <time dateTime={parsedDate.toISOString()} {...props}>
      {dateFormatter.format(parsedDate)}
    </time>
  );
}
