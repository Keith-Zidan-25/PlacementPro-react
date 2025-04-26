// Converted React + TailwindCSS version of your styled-components setup

export const Container = ({ children }) => (
    <div className="bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[678px] max-w-full min-h-[400px]">
      {children}
    </div>
  );
  
  export const SignUpContainer = ({ children, signinIn }) => (
    <div
      className={`absolute top-0 h-full w-1/2 opacity-0 z-[1] transition-all duration-500 ease-in-out
        ${!signinIn ? 'translate-x-full opacity-100 z-[5]' : ''}`}
    >
      {children}
    </div>
  );
  
  export const SignInContainer = ({ children, signinIn }) => (
    <div
      className={`absolute top-0 h-full w-1/2 z-[2] transition-all duration-500 ease-in-out
        ${!signinIn ? 'translate-x-full' : ''}`}
    >
      {children}
    </div>
  );
  
  export const Form = ({ children, ...props }) => (
    <form {...props} className="bg-white flex flex-col items-center justify-center px-[50px] h-full">
      {children}
    </form>
  );

  export const Label = ({ children, ...props }) => (
    <label {...props} className="flex flex-col justify-start text-md font-light leading-5 tracking-wide my-5">
        {children}
    </label>
  );
  
  export const Title = ({ children }) => (
    <h1 className="font-bold m-0">{children}</h1>
  );

  export const RadialSelectInput = ({ id, value, name }) => (
    <label htmlFor={id} className="flex items-center gap-1">
      <input type="radio" id={id} value={value} name={name} className="accent-purple-700" />
      {value}
    </label>
  );  
  
  export const Input = (props) => (
    <input
      {...props}
      className="bg-white border border-slate-200 rounded-[3px] py-2 px-3 my-2 w-full text-left"
    />
  );
  
  export const TextArea = (props) => (
    <textarea
      {...props}
      className="bg-white border border-slate-200 rounded-[3px] py-2 px-3 my-2 w-full text-left"
    />
  );
  
  export const Button = ({ children, ...props }) => (
    <button
      {...props}
      className="rounded-[20px] border border-purple-700 bg-purple-700 text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-75 active:scale-95 focus:outline-none"
    >
      {children}
    </button>
  );
  
  export const GhostButton = ({ children, ...props }) => (
    <Button {...props} className="bg-transparent border-white text-white">
      {children}
    </Button>
  );
  
  export const Anchor = ({ children, ...props }) => (
    <a {...props} className="text-gray-800 text-sm no-underline my-4">
      {children}
    </a>
  );
  
  export const OverlayContainer = ({ children, signinIn }) => (
    <div
      className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-[100]
        ${!signinIn ? '-translate-x-full' : ''}`}
    >
      {children}
    </div>
  );
  
  export const Overlay = ({ children, signinIn }) => (
    <div
      className={`bg-gradient-to-r from-purple-700 to-purple-500 bg-no-repeat bg-cover bg-left text-white relative -left-full h-full w-[200%] transition-transform duration-500 ease-in-out
        ${!signinIn ? 'translate-x-1/2' : ''}`}
    >
      {children}
    </div>
  );
  
  export const OverlayPanel = ({ children, className = '' }) => (
    <div
      className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-500 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
  
  export const LeftOverlayPanel = ({ children, signinIn }) => (
    <OverlayPanel className={`${!signinIn ? 'translate-x-0' : '-translate-x-1/5'}`}>
      {children}
    </OverlayPanel>
  );
  
  export const RightOverlayPanel = ({ children, signinIn }) => (
    <OverlayPanel className={`right-0 ${!signinIn ? 'translate-x-1/5' : 'translate-x-0'}`}>
      {children}
    </OverlayPanel>
  );
  
  export const Paragraph = ({ children }) => (
    <p className="text-sm font-light leading-5 tracking-wide my-5">
      {children}
    </p>
  );
  