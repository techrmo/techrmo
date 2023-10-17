import { SVGProps, useId } from 'react';

interface FormkitYoutubeProps extends SVGProps<SVGSVGElement> {
  gradientColor: 'green' | 'yellow';
}

function FormkitYoutube({ gradientColor, ...props }: FormkitYoutubeProps) {
  const id = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="19"
      viewBox="0 0 23 19"
      fill="none"
      {...props}
    >
      <path
        d="M11.5 0.5C0.197143 0.5 0 1.51455 0 9.5C0 17.4855 0.197143 18.5 11.5 18.5C22.8029 18.5 23 17.4855 23 9.5C23 1.51455 22.8029 0.5 11.5 0.5ZM15.18 9.89273L10.0214 12.3473C9.56143 12.56 9.2 12.3145 9.2 11.8073V7.19273C9.2 6.68545 9.57786 6.44 10.0214 6.65273L15.18 9.10727C15.64 9.32 15.64 9.68 15.18 9.89273Z"
        fill={`url(#${id})`}
      />
      <defs>
        <linearGradient
          id={id}
          x1="9.5"
          y1="0.5"
          x2="9.5"
          y2="16.5"
          gradientUnits="userSpaceOnUse"
        >
          {gradientColor === 'green' ? (
            <>
              <stop stopColor="#00FE44" />
              <stop offset="1" stopColor="#299E48" />
            </>
          ) : (
            <>
              <stop stopColor="#FFE927" />
              <stop offset="1" stopColor="#FFDBB0" />
            </>
          )}
        </linearGradient>
      </defs>
    </svg>
  );
}
export default FormkitYoutube;
