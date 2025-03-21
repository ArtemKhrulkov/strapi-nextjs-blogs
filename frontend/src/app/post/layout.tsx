export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center content-center sm:p-12 lg:p-24 p-7">
      {children}
    </section>
  );
}
