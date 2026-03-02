import s from './_skeleton.module.scss';

interface ISkeletonProps {
  type?: 'text' | 'title' | 'avatar' | 'thumbnail';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton = ({
  type = 'text',
  width,
  height,
  className = '',
}: ISkeletonProps) => {
  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && {
      height: typeof height === 'number' ? `${height}px` : height,
    }),
  };

  return (
    <div className={`${s.skeleton} ${s[type]} ${className}`} style={style} />
  );
};
