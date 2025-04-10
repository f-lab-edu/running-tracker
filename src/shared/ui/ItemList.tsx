import { FC } from "react";

interface ItemListProps<I> {
  items: I[];
  children: (item: I) => React.ReactNode;
}

export const ItemList: FC<ItemListProps<any>> = (props) => {
  const { items, children } = props;
  return <ul>
    {items.map((item, index) => {
      return <li key={index}>
        {children(item)}
      </li>
    })}
  </ul>
}