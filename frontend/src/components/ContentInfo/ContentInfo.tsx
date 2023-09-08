import React from 'react';
import { Button, Typography, Space, Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useContentDelete } from 'hooks/useContent/contentDelete/useContentDelete';
import { useContentInfo } from 'hooks/useContent/contentInfo/useContentInfo';
import styles from './lib/contentInfo.module.css';
import CommentList from 'components/CommentList/CommentList';

const { Text, Title } = Typography;

const ContentInfo = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);
  const { contentInfo } = useContentInfo(contentId);
  const { handleDelete } = useContentDelete(contentId);
  const navigate = useNavigate();

  const handleEditClick = (contentId: number) => {
    navigate(`/content/edit/${contentId}`);
  };

  return (
    <>
      <div className={styles.infoContainer}>
        <Title level={2}>{contentInfo?.title}</Title>
        <Text className={styles.content}>{contentInfo?.content}</Text>
        <Divider />
        <Space>
          <Button type="primary" onClick={() => handleEditClick(1)} className={styles.button}>
            수정
          </Button>
          <Button type="primary" onClick={handleDelete} className={styles.button}>
            삭제
          </Button>
        </Space>
        <div className={styles.commentContainer}>
          <CommentList />
        </div>
      </div>
    </>
  );
};

export default ContentInfo;
