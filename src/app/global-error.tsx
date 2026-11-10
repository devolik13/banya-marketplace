"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: "sans-serif", padding: "48px 24px", textAlign: "center" }}>
        <h1>Что-то пошло не так</h1>
        <p>Попробуйте обновить страницу.</p>
        <button onClick={() => reset()} style={{ marginTop: 16, padding: "8px 20px" }}>
          Обновить
        </button>
      </body>
    </html>
  );
}
