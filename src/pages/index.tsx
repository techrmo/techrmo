import { InputBox } from '@/modules/game/components/RowInput/InputBox';

export default function Home() {
  return (
    <>
      <h1>Test</h1>
      <div style={{ display: 'flex', margin: '20px', gap: '10px' }}>
        <InputBox />
        <InputBox />
        <InputBox />
        <InputBox />
        <InputBox />
      </div>
    </>
  );
}
