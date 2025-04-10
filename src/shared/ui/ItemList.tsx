interface ItemListProps<I> {
  items: I[];
  className?: string;
  itemClassName?: string;
  children: (item: I) => React.ReactNode;
}

export const ItemList = <T extends object | any>(props: Readonly<ItemListProps<T>>) => {
  const { items, children, itemClassName, className } = props;
  return <ul className={className}>
    {items.map((item, index) => {
      return <li key={index} className={itemClassName}>
        {children(item)}
      </li>
    })}
  </ul>
}