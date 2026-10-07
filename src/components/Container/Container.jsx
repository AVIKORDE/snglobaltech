export default function Container({ wide = false, className = '', as: Tag = 'div', children, ...rest }) {
  return (
    <Tag className={`container ${wide ? 'container--wide' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
