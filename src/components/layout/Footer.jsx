export default function Footer() {
  return (
    <footer className="flex justify-center text-center text-sm md:text-lg text-zinc-600 p-4">
      &copy; {new Date().getFullYear()} Noppol Phonart. All rights reserved.
    </footer>
  );
}
