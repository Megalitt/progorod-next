import type { ReactElement } from 'react';

export const getFaviconTags = (filePath: string): ReactElement | null => {
  // Проверяем, что путь существует и имеет расширение
  if (!filePath || !filePath.includes('.')) {
    return null;
  }

  const ext = filePath.split('.').pop()?.toLowerCase();
  
  const types: Record<string, string> = {
    ico: 'image/x-icon',
    png: 'image/png',
    svg: 'image/svg+xml',
  };

  // Если формат не поддерживается, не рендерим тег
  if (!ext || !types[ext]) {
    return null;
  }

  return (
    <link
      rel="icon"
      href={`/${filePath}`}
      type={types[ext]}
      key={`favicon-${ext}`} // важно для React-ключей при множественных иконках
    />
  );
}
