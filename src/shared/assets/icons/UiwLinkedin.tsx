import { SVGProps, useId } from 'react';

interface UiwLinkedinProps extends SVGProps<SVGSVGElement> {
  gradientColor: 'green' | 'yellow';
}

function UiwLinkedin({ gradientColor, ...props }: UiwLinkedinProps) {
  const id = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.47327e-07 2.17091C2.47327e-07 1.72776 0.176042 1.30276 0.489398 0.9894C0.802754 0.676044 1.22776 0.500002 1.67091 0.500002H18.3273C18.5469 0.499644 18.7644 0.542605 18.9674 0.626426C19.1704 0.710248 19.3548 0.833284 19.5102 0.98849C19.6656 1.1437 19.7888 1.32802 19.8729 1.53092C19.9569 1.73382 20.0001 1.9513 20 2.17091V18.8273C20.0002 19.0469 19.9572 19.2645 19.8732 19.4675C19.7893 19.6705 19.6662 19.8549 19.5109 20.0103C19.3556 20.1656 19.1713 20.2889 18.9683 20.3729C18.7654 20.4569 18.5478 20.5001 18.3282 20.5H1.67091C1.45141 20.5 1.23405 20.4568 1.03127 20.3727C0.828487 20.2887 0.644247 20.1655 0.489077 20.0103C0.333906 19.855 0.210847 19.6707 0.12693 19.4679C0.0430121 19.2651 -0.000119178 19.0477 2.47327e-07 18.8282V2.17091ZM7.91636 8.12546H10.6245V9.48546C11.0155 8.70364 12.0155 8 13.5182 8C16.3991 8 17.0818 9.55727 17.0818 12.4145V17.7073H14.1664V13.0655C14.1664 11.4382 13.7755 10.52 12.7827 10.52C11.4055 10.52 10.8327 11.51 10.8327 13.0655V17.7073H7.91636V8.12546ZM2.91636 17.5827H5.83273V8H2.91636V17.5827ZM6.25 4.87455C6.2555 5.12425 6.21107 5.37254 6.11931 5.60483C6.02755 5.83713 5.89032 6.04876 5.71566 6.2273C5.54101 6.40585 5.33245 6.5477 5.10223 6.64455C4.87201 6.7414 4.62476 6.79129 4.375 6.79129C4.12524 6.79129 3.87799 6.7414 3.64777 6.64455C3.41755 6.5477 3.20899 6.40585 3.03433 6.2273C2.85968 6.04876 2.72245 5.83713 2.63069 5.60483C2.53893 5.37254 2.4945 5.12425 2.5 4.87455C2.51079 4.38441 2.71308 3.91799 3.06353 3.57517C3.41399 3.23235 3.88475 3.04038 4.375 3.04038C4.86525 3.04038 5.33601 3.23235 5.68647 3.57517C6.03692 3.91799 6.23921 4.38441 6.25 4.87455Z"
        fill={`url(#${id})`}
      />
      <defs>
        <linearGradient
          id={id}
          x1="10"
          y1="0.5"
          x2="10"
          y2="20.5"
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
export default UiwLinkedin;