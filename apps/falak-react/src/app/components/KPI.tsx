import styled from '@emotion/styled';
import { FlexboxGrid, Panel, Col } from 'rsuite';
import { FcPlus, FcFullTrash, FcSynchronize } from 'react-icons/fc';

const KpiCard = styled(Panel)`
  overflow: hidden;
  position: relative;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.75);
  display: inline-block;
  float: left;
  padding: 1em;
  border-radius: 0.3em;
  font-family: sans-serif;
  width: 240px;
  min-width: 180px;
  margin-left: 0.5em;
  margin-top: 0.5em;
  color: #fff;
  h5 {
    color: #fff;
  }
`;

const UpdateCard = styled(KpiCard)`
  background: #ffc241;
`;

const InsertCard = styled(KpiCard)`
  background: #886ab5;
`;

const DeleteCard = styled(KpiCard)`
  background: #a83b3b;
`;

const KpiIcon = styled.div`
  float: right;
  font-size: 500%;
  position: absolute;
  top: 0rem;
  right: -0.3rem;
  opacity: 0.16;
`;

interface KPIProps {
  INSERT: number;
  total: number;
  UPDATE: number;
  DELETE: number;
}

export const KPI = ({ INSERT, DELETE, total, UPDATE }: KPIProps) => {
  return (
    <>
      <FlexboxGrid.Item colspan={8} as={Col} xs={24} md={8} lg={8}>
        <InsertCard header={<h5>inserts {((INSERT / total) * 100).toFixed(2)}%</h5>} bordered>
          <h5>{INSERT.toLocaleString()}</h5>
          <KpiIcon>
            <FcPlus />
          </KpiIcon>
        </InsertCard>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={8} as={Col} xs={24} md={8} lg={8}>
        <UpdateCard header={<h5>updates {((UPDATE / total) * 100).toFixed(2)}%</h5>} bordered>
          <h5>{UPDATE.toLocaleString()}</h5>
          <KpiIcon>
            <FcSynchronize />
          </KpiIcon>
        </UpdateCard>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={8} as={Col} xs={24} md={8} lg={8}>
        <DeleteCard header={<h5>deletes {((DELETE / total) * 100).toFixed(2)}%</h5>} bordered>
          <h5>{DELETE.toLocaleString()}</h5>
          <KpiIcon>
            <FcFullTrash />
          </KpiIcon>
        </DeleteCard>
      </FlexboxGrid.Item>
    </>
  );
};
