import Tag from '@/components/common/Tag';

export default function TagPage() {
  return (
    <div style={{ display: 'flex', gap: `0.5rem` }}>
      <Tag size="small">재고 10개 미만</Tag>
      <Tag size="large" type="thumbsUp">
        리뷰 100개 이상
      </Tag>
    </div>
  );
}
