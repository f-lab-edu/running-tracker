interface ItemListProps<I> {
  items: I[];
  children: (item: I) => React.ReactNode;
}

export const ItemList = <T extends object | any>(props: Readonly<ItemListProps<T>>) => {
  const { items, children } = props;
  return <ul>
    {items.map((item, index) => {
      return <li key={index}>
        {children(item)}
      </li>
    })}
  </ul>
}