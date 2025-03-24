// types/react-image-magnify.d.ts
declare module 'react-image-magnify' {
    import { ComponentType, CSSProperties } from 'react';
  
    interface SmallImage {
      alt: string;
      isFluidWidth?: boolean;
      src: string;
      width?: number;
      height?: number;
    }
  
    interface LargeImage {
      src: string;
      width: number;
      height: number;
    }
  
    interface ReactImageMagnifyProps {
      smallImage: SmallImage;
      largeImage: LargeImage;
      enlargedImageContainerStyle?: CSSProperties;
      className?: string;
      style?: CSSProperties;
      isHintEnabled?: boolean;
      hintTextMouse?: string;
      hintTextTouch?: string;
      fadeDurationInMs?: number;
      hoverDelayInMs?: number;
      hoverOffDelayInMs?: number;
      isActivatedOnTouch?: boolean;
    }
  
    const ReactImageMagnify: ComponentType<ReactImageMagnifyProps>;
  
    export default ReactImageMagnify;
  }
  