"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  ConfigProvider,
  Empty,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
  message,
  type TableColumnsType,
} from "antd";
import zhCN from "antd/locale/zh_CN";
import AdminPageHeader from "@/app/components/admin/AdminPageHeader";
import AdminPageLoading from "@/app/components/admin/AdminPageLoading";
import { getAuthorizationHeaders, publicApiBaseUrl } from "@/app/libs/auth-client";
import { useAdminAccess } from "@/app/hooks/useAdminAccess";

type IntentMessage = {
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
};

type RecruitmentIntent = {
  id: string;
  email: string;
  status: "PENDING_REVIEW" | "ACCEPTED";
  emailDeliveryStatus: "PENDING_CONTENT" | "SENT" | "FAILED";
  createdAt: string;
};

type RecruitmentIntentDetail = RecruitmentIntent & {
  conversation: { messages: IntentMessage[] };
};

type IntentListResponse = {
  items: RecruitmentIntent[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type IntentStatusFilter = "" | "PENDING_REVIEW" | "ACCEPTED";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isIntentListResponse = (value: unknown): value is IntentListResponse =>
  isRecord(value) &&
  Array.isArray(value.items) &&
  typeof value.page === "number" &&
  typeof value.total === "number" &&
  typeof value.totalPages === "number";

const getResponseError = async (response: Response, fallback: string): Promise<string> => {
  try {
    const data: unknown = await response.json();
    return isRecord(data) && typeof data.error === "string" ? data.error : fallback;
  } catch {
    return fallback;
  }
};

const RecruitmentAdminPage = () => {
  const { isAuthenticated, isAuthReady, lang, router } = useAdminAccess();
  const [result, setResult] = useState<IntentListResponse | null>(null);
  const [status, setStatus] = useState<IntentStatusFilter>("PENDING_REVIEW");
  const [selectedIntent, setSelectedIntent] = useState<RecruitmentIntentDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadIntents = useCallback(async (page: number, currentStatus: IntentStatusFilter): Promise<void> => {
    setLoadingList(true);
    try {
      const query = new URLSearchParams({ page: String(page), pageSize: "20" });
      if (currentStatus) query.set("status", currentStatus);
      const response = await fetch(`${publicApiBaseUrl}/api/admin/recruitment-intents?${query}`, {
        headers: getAuthorizationHeaders(),
      });
      if (!response.ok) throw new Error(await getResponseError(response, "无法加载加入意向"));
      const data: unknown = await response.json();
      if (!isIntentListResponse(data)) throw new Error("返回的加入意向数据无效");
      setResult(data);
      setError(null);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;
    void loadIntents(1, status).catch((loadError: unknown) => {
      setError(loadError instanceof Error ? loadError.message : "无法加载加入意向");
    });
  }, [isAuthReady, isAuthenticated, loadIntents, status]);

  const viewDetail = async (intentId: string): Promise<void> => {
    setLoadingId(intentId);
    setError(null);
    try {
      const response = await fetch(`${publicApiBaseUrl}/api/admin/recruitment-intents/${intentId}`, {
        headers: getAuthorizationHeaders(),
      });
      if (!response.ok) throw new Error(await getResponseError(response, "无法加载对话详情"));
      const data: unknown = await response.json();
      if (!isRecord(data) || !isRecord(data.conversation)) throw new Error("返回的对话数据无效");
      setSelectedIntent(data as RecruitmentIntentDetail);
    } catch (detailError: unknown) {
      setError(detailError instanceof Error ? detailError.message : "无法加载对话详情");
    } finally {
      setLoadingId(null);
    }
  };

  const acceptIntent = async (intentId: string): Promise<void> => {
    setLoadingId(intentId);
    setError(null);
    try {
      const response = await fetch(`${publicApiBaseUrl}/api/admin/recruitment-intents/${intentId}/accept`, {
        method: "POST",
        headers: getAuthorizationHeaders(),
      });
      if (!response.ok) throw new Error(await getResponseError(response, "无法更新审核状态"));
      await loadIntents(result?.page ?? 1, status);
      if (selectedIntent?.id === intentId) {
        setSelectedIntent((current) => (current ? { ...current, status: "ACCEPTED" } : null));
      }
      message.success("已同意加入，列表已更新");
    } catch (acceptError: unknown) {
      const errorMessage = acceptError instanceof Error ? acceptError.message : "无法更新审核状态";
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoadingId(null);
    }
  };

  const deleteIntent = async (intentId: string): Promise<void> => {
    setDeletingId(intentId);
    setError(null);
    try {
      const response = await fetch(`${publicApiBaseUrl}/api/admin/recruitment-intents/${intentId}`, {
        method: "DELETE",
        headers: getAuthorizationHeaders(),
      });
      if (!response.ok) throw new Error(await getResponseError(response, "无法删除加入意向"));
      if (selectedIntent?.id === intentId) setSelectedIntent(null);
      await loadIntents(result?.page ?? 1, status);
      message.success("加入意向已删除");
    } catch (deleteError: unknown) {
      const errorMessage = deleteError instanceof Error ? deleteError.message : "无法删除加入意向";
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const columns: TableColumnsType<RecruitmentIntent> = [
    { title: "邮箱", dataIndex: "email", key: "email", render: (email: string) => <Typography.Text strong>{email}</Typography.Text> },
    {
      title: "提交时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleString("zh-CN"),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (intentStatus: RecruitmentIntent["status"]) => (
        <Tag color={intentStatus === "ACCEPTED" ? "success" : "gold"}>
          {intentStatus === "ACCEPTED" ? "已同意" : "待审核"}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "actions",
      align: "right",
      render: (_value: unknown, intent: RecruitmentIntent) => (
        <Space size="small">
          <Button type="link" loading={loadingId === intent.id} onClick={() => void viewDetail(intent.id)}>
            查看详情
          </Button>
          {intent.status !== "ACCEPTED" && (
            <Button danger type="primary" loading={loadingId === intent.id} onClick={() => void acceptIntent(intent.id)}>
              同意加入
            </Button>
          )}
          <Popconfirm
            title="删除加入意向"
            description="删除后将同时清除该申请的完整对话记录，无法恢复。"
            okText="确认删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
            onConfirm={() => void deleteIntent(intent.id)}
          >
            <Button danger loading={deletingId === intent.id}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!isAuthReady) return <AdminPageLoading />;
  if (!isAuthenticated) return null;

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: "#d43831", borderRadius: 10 } }}>
      <main className="relative z-[70] min-h-screen pointer-events-auto bg-neutral-100 px-5 py-28 text-neutral-900">
        <section className="mx-auto max-w-6xl">
          <AdminPageHeader
            title="加入意向"
            description="列表仅展示基础信息；完整对话按需打开，避免大量数据同时加载。"
            actions={<Button size="large" onClick={() => router.push(`/${lang}/admin/addNews`)}>返回后台</Button>}
          />

          <Card className="mt-6 shadow-sm" styles={{ body: { padding: 16 } }}>
            <Tabs
              activeKey={status}
              onChange={(key) => setStatus(key as IntentStatusFilter)}
              items={[
                { key: "PENDING_REVIEW", label: "待审核" },
                { key: "ACCEPTED", label: "已同意" },
                { key: "", label: "全部" },
              ]}
            />
          </Card>

          {error && <Alert className="mt-4" type="error" showIcon message="操作失败" description={error} closable onClose={() => setError(null)} />}

          <Card className="mt-5 shadow-sm" styles={{ body: { padding: 0 } }}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={result?.items ?? []}
              loading={loadingList}
              locale={{ emptyText: <Empty description="暂无符合筛选条件的加入意向" /> }}
              pagination={{
                current: result?.page ?? 1,
                pageSize: result?.pageSize ?? 20,
                total: result?.total ?? 0,
                showSizeChanger: false,
                showTotal: (total) => `共 ${total} 条`,
              }}
              onChange={(pagination) => void loadIntents(pagination.current ?? 1, status).catch((pageError: unknown) => {
                setError(pageError instanceof Error ? pageError.message : "无法加载加入意向");
              })}
            />
          </Card>
        </section>
      </main>

      <Modal
        open={selectedIntent !== null}
        title="招新对话详情"
        onCancel={() => setSelectedIntent(null)}
        width={760}
        footer={selectedIntent?.status !== "ACCEPTED" ? <Button danger type="primary" loading={loadingId === selectedIntent?.id} onClick={() => selectedIntent && void acceptIntent(selectedIntent.id)}>同意加入</Button> : null}
      >
        {selectedIntent && (
          <div>
            <Typography.Text type="secondary">{selectedIntent.email}</Typography.Text>
            <div className="mt-5 max-h-[55vh] space-y-3 overflow-y-auto rounded-xl bg-neutral-50 p-4">
              {selectedIntent.conversation.messages.map((chatMessage, index) => (
                <div key={`${selectedIntent.id}-${index}`} className={chatMessage.role === "USER" ? "text-right" : "text-left"}>
                  <Tag color={chatMessage.role === "USER" ? "red" : "blue"}>{chatMessage.role === "USER" ? "申请人" : "AI 助手"}</Tag>
                  <Typography.Paragraph className="!mb-0 !mt-1 inline-block max-w-[85%] whitespace-pre-wrap rounded-xl bg-white px-3 py-2 text-left shadow-sm">
                    {chatMessage.content}
                  </Typography.Paragraph>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default RecruitmentAdminPage;
