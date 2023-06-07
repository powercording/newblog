export default function JoinPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    console.log("으아");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={handleSubmit}>
        <button type="submit">123</button>
      </form>
    </main>
  );
}
