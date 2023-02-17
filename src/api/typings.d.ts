// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Download = {
    type_no?: number;
    type_name: string;
    downloadTotal: number;
    clickTotal: number;
    parent_type_no?: string;
    priority?: number;
  }[];

  type Reporter = {
    accountAuthRecordList?: {
      createTime?: string;
      createUserName?: string;
      date?: string;
      dateType?: string;
      deleted?: string;
      deptName?: string;
      id?: number;
      reportId?: string;
      reportName?: string;
      status?: string;
      transmissionIndex?: number;
      updateTime?: string;
      updateUserName?: string;
      version?: number;
      ranking?: number;
    }[];
    date?: string;
    dateType?: string;
    page_count?: string;
    queryDate?: string;
    showCount?: number;
    startNum?: number;
  };

  type News = Array<{
    actionType: string;
    activityNewsCover: string;
    activityNewsTitle: string;
    infoType: number;
    introduce: string;
    linkUrl: string;
    sort: number;
    tid: number;
  }>;

  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
