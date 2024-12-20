
import { TableProps } from './table.types';

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  actions,
}: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key as string}>
              {col.label}
            </th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.key as string}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            {actions && (
              <td>
                {actions(row).map((action, actionIdx) => (
                  <span key={actionIdx}>{action}</span>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
