export const ClockCirceIcon = (props) => (
  <svg
    width={72}
    height={72}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <style>
      {'@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}'}
    </style>
    <rect
      width={16}
      height={16}
      x={4}
      y={4}
      stroke='#525252'
      strokeWidth={1}
      rx={8}
    />
    <path
      stroke='#fb7185'
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M12.021 12l2.325 2.325'
    />
    <path
      stroke='#06b6d4'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M12.021 12V6.84'
      style={{
        animation: 'rotate 2s linear infinite both',
        transformOrigin: 'center'
      }}
    />
  </svg>
)
