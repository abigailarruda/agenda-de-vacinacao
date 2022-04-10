export function formatDateToRequest(date: string) {
  return date.split('/').reverse().join('-');
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
