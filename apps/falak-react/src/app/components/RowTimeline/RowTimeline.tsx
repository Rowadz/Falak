export const RowTimeline = () => {
  return <div>RowTimeline</div>;
};

/* <CustomContainer>
          {tableNames?.map((tableName: string) => {
            const total =
              dataByTable[tableName]?.DELETE +
              dataByTable[tableName]?.INSERT +
              dataByTable[tableName]?.UPDATE;
            return (
              <Chart
                key={tableName}
                options={getOptions({
                  title: { text: `${tableName} table [${total}] total queries` },
                  series: {
                    name: tableName,
                    type: 'pie',
                    radius: '50%',
                    // label: { show: false },
                    label: {
                      color: '#fff',
                      formatter: '{b}S: {c} ({d}%)',
                    },
                    // animation: false,
                    // animationDelay: (idx) => 10 * idx,
                    data: [
                      {
                        value: dataByTable[tableName]?.DELETE,
                        name: 'DELETE',
                        itemStyle: { color: '#DE5B49' },
                      },
                      {
                        value: dataByTable[tableName]?.INSERT,
                        name: 'INSERT',
                        itemStyle: { color: '#18778C' },
                      },
                      {
                        value: dataByTable[tableName]?.UPDATE,
                        name: 'UPDATE',
                        itemStyle: { color: '#FFB39C' },
                      },
                    ],
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                      },
                    },
                  },
                })}
              />
            );
          })
          */
