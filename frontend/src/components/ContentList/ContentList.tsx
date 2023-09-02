import React from 'react';
import { Link } from 'react-router-dom';
import { List, Spin, Typography, Card, Space } from 'antd';
import { useContentList } from 'hooks/contentsList/useContentsList';
const { Text } = Typography;
import moment from 'moment';
import styles from './lib/contentList.module.css';

const ContentList = () => {
  const { contentList, loading } = useContentList();

  return (
    <div>
      {loading ? (
        <Spin >
          <div>Loading</div>
        </Spin>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={contentList}
          renderItem={(content) => (
            <List.Item key={content.id}>
              <Link to={`/content/${content.id}`}>
                <Card>
                  <Card.Meta
                    title={content.title}
                    description={
                      <Space>
                        <Text>User: {content.user_name}</Text>
                        <span className={styles.span}>{moment(content.updated_at).format('YYYY-MM-DD')}</span>
                      </Space>
                    }
                  />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ContentList;
