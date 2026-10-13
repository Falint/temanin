const paths = {
  chat: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-3 3v-11A8.5 8.5 0 0 1 9.5 3h3a8.5 8.5 0 0 1 8.5 8.5ZM7 10h8M7 14h5',
  book: 'M12 5C8 2 3 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15',
  game: 'M8 7h8c3 0 4 2 5 6l1 4c.5 3-2 4-4 2l-3-3H9l-3 3c-2 2-4.5 1-4-2l1-4c1-4 2-6 5-6Zm-3 5h6m-3-3v6m8-3h.01m3 2h.01',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
  people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
};
export default function Icon({ name = 'spark', size = 24, className }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.spark} /></svg>;
}
