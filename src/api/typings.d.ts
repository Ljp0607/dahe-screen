// @ts-ignore
/* eslint-disable */

declare namespace API {
  type HotDataList = {
    wordSourceName: string;
    wordSource: number;
    dateList: {
      createTime: string;
      word: string;
      wordSource: number;
    }[];
  }[];
  type newsReport = {
    pc_browse_num: number;
    client_channel_id: number;
    user_name: string;
    community_name: string;
    news_publish_date: number;
    news_editor: string;
    news_browse_num: number;
    news_id: number;
    client_channel_name: string;
    community_id: number;
    news_editor_id: string;
    sum_browse_num: number;
    news_title: string;
    words_newsman: string;
  }[];

  type exposeList = {
    showCount: number;
    page_index: number;
    startNum: number;
    page_count: number;
    announceList: {
      announceDesc: string;
      createTime: string;
    }[];
  };

  type hotList = {
    short_video_title: string;
    short_video_id: string;
    community_name: string;
    edit_man: string;
    short_video_url: string;
    short_video_publish_time: string;
    short_video_browse_num: number;
    words_newsman: string;
  }[];
  type Livelist = {
    liveList?: {
      line_user?: 8081;
      user_name?: string;
      video_img?: string;
      yynum?: number;
      newsCommentsNum?: number;
      studio_broadcast_address: string;
      recorded_address?: string;
      typesOf?: number;
      pushed_back_flow_end: string;
      action?: string;
      communityName?: string;
      communityId?: number;
      live_start_time?: string;
      channel_name?: string;
      live_end_time?: string;
      user_head?: string;
      livenum?: number;
      live_state?: number;
      user_num?: number;
      video_title?: string;
      user_id?: string;
      send_comments_type?: number;
      communityImg?: string;
      newsLabel?: string;
      labelColour?: string;
      video_id?: string;
    }[];
    reserveStudioSize?: number;
  };
  type Download = {
    type_no?: string;
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
