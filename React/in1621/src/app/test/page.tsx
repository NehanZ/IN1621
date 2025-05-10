'use client'; // IMPORTANT

export default function TestPage() {
  return (
    <main>
      <button
        onClick={() => {
          console.log('Test button clicked');
          alert('Test alert!');
        }}
        style={{ padding: '10px', backgroundColor: 'lightblue' }}
      >
        Test Alert Button
      </button>
    </main>
  );
}
