import { useState } from "react";

const sections = [
  "账号定位",
  "内容支柱",
  "月度计划",
  "爆款脚本",
  "运营策略",
];

const pillars = [
  {
    icon: "🎬",
    name: "办公室日常",
    ratio: "40%",
    desc: "真实工作场景、团队互动、加班吐槽、下午茶、工位环境",
    examples: [
      "广告算法工程师的一天是怎么过的",
      "我们开会时的真实画面 vs 领导以为的样子",
      "创业公司午饭图鉴：从外卖到自己做",
      "面试了100份简历，只有3个能用（真实吐槽）",
      "程序员的工位有多离谱",
    ],
    hook: "日常共鸣 → 关注",
    color: "#FF6B6B",
  },
  {
    icon: "🧠",
    name: "广告算法科普",
    ratio: "25%",
    desc: "用生活化的方式讲解广告算法原理，降低认知门槛",
    examples: [
      "你刷到的每条广告，背后都在竞价（1分钟讲清RTB）",
      "为什么你搜了一次奶粉，全网都在给你推奶粉",
      "CTR是什么？用相亲来解释点击率预估",
      "广告算法工程师年薪50w，到底在干嘛",
      "AI投广告 vs 人工投广告，差距有多大",
    ],
    hook: "知识增量 → 收藏",
    color: "#4ECDC4",
  },
  {
    icon: "🚀",
    name: "产品与行业",
    ratio: "20%",
    desc: "GrowthGPT 产品能力展示、行业趋势、客户案例",
    examples: [
      "用AI投广告，ROI翻了3倍（真实案例）",
      "2026年还在手动调广告？你可能亏了很多钱",
      "跨境电商投放避坑指南（我们踩过的坑）",
      "一个工具替代3个投手，老板看完沉默了",
      "Meta广告 vs 巨量引擎，哪个更烧钱",
    ],
    hook: "解决方案 → 咨询",
    color: "#45B7D1",
  },
  {
    icon: "👥",
    name: "招聘与文化",
    ratio: "15%",
    desc: "团队文化展示、招聘信息、行业薪资、职场建议",
    examples: [
      "我们招了3个月广告算法工程师，总结出这些经验",
      "广告算法岗薪资天花板到底多高",
      "创业公司 vs 大厂，选哪个？（过来人说）",
      "LeapMind在找什么样的人（附真实JD解读）",
      "AI广告行业未来3年最缺什么人才",
    ],
    hook: "共鸣/机会 → 私信",
    color: "#96CEB4",
  },
];

const monthPlan = [
  {
    week: "第1周",
    theme: "账号启动·建立人设",
    posts: [
      { day: "周一", type: "办公室日常", title: "创业公司第一天：我们的工位长这样", format: "图文9宫格", tip: "真实感 > 精致感" },
      { day: "周三", type: "广告科普", title: "你每天刷到的广告，其实在「打架」", format: "视频60s", tip: "用外卖竞价比喻RTB" },
      { day: "周五", type: "办公室日常", title: "程序员的周五下午：摸鱼实录", format: "视频30s", tip: "轻松搞笑收尾" },
    ],
  },
  {
    week: "第2周",
    theme: "科普破圈·建立专业感",
    posts: [
      { day: "周一", type: "广告科普", title: "CTR是什么？用相亲成功率来解释", format: "图文轮播", tip: "类比生活场景" },
      { day: "周三", type: "产品行业", title: "AI投广告 vs 人工投广告，差多少？", format: "视频90s", tip: "数据对比+案例" },
      { day: "周五", type: "办公室日常", title: "开会时老板说「再优化一下」的真实含义", format: "视频30s", tip: "职场梗" },
    ],
  },
  {
    week: "第3周",
    theme: "深度内容·沉淀收藏",
    posts: [
      { day: "周一", type: "产品行业", title: "跨境电商广告投放避坑指南（附清单）", format: "图文轮播", tip: "干货型，引导收藏" },
      { day: "周三", type: "办公室日常", title: "面试100份简历只有3份能用（真实吐槽）", format: "视频60s", tip: "关联招聘话题" },
      { day: "周五", type: "广告科普", title: "为什么你搜一次奶粉，全网都在推奶粉", format: "视频60s", tip: "隐私话题自带流量" },
    ],
  },
  {
    week: "第4周",
    theme: "转化引导·招聘+合作",
    posts: [
      { day: "周一", type: "招聘文化", title: "广告算法工程师年薪多少？（真实数据）", format: "图文轮播", tip: "薪资话题引流" },
      { day: "周三", type: "产品行业", title: "一个工具替代3个投手，老板沉默了", format: "视频90s", tip: "软性产品植入" },
      { day: "周五", type: "办公室日常", title: "创业公司一个月了，变化有多大", format: "视频60s", tip: "月度复盘+情感" },
    ],
  },
];

const scriptTemplate = {
  title: "60秒科普视频脚本模板",
  structure: [
    { time: "0-5s", name: "钩子", content: "你知道你每刷到一条广告，背后有上千个广告在「打架」吗？", tip: "制造好奇/反常识/提问" },
    { time: "5-15s", name: "痛点", content: "很多商家花了几万投广告，效果还不如别人花几千的。为什么？因为广告平台在用算法做「拍卖」。", tip: "建立关联感" },
    { time: "15-40s", name: "干货", content: "简单说，每条广告都会出一个价，平台会综合出价和质量分来决定展示给谁。质量分就是CTR预估——系统预测这个人点你广告的概率。所以不是钱多就能赢，而是「出价 × 质量」最高的赢。", tip: "核心知识点，通俗易懂" },
    { time: "40-50s", name: "案例", content: "我们帮一个客户用AI优化质量分，出价降了30%，曝光反而多了2倍。", tip: "真实数据增加可信度" },
    { time: "50-60s", name: "收尾", content: "想知道怎么不多花钱也能让广告效果翻倍？关注我，下期讲。", tip: "引导关注+预告" },
  ],
};

const colorMap = {
  "办公室日常": "#FF6B6B",
  "广告科普": "#4ECDC4",
  "产品行业": "#45B7D1",
  "招聘文化": "#96CEB4",
  "广告算法科普": "#4ECDC4",
  "产品与行业": "#45B7D1",
  "招聘与文化": "#96CEB4",
};

export default function XHSPlan() {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedWeek, setExpandedWeek] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e8e6e3",
      fontFamily: "'Noto Sans SC', 'SF Pro Display', -apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        padding: "32px 24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>📕</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
              LeapMind 小红书运营方案
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "#888", marginTop: 2 }}>
              GrowthGPT · 广告算法 · 生活化科普账号
            </p>
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div style={{
        display: "flex", gap: 4, padding: "12px 24px",
        overflowX: "auto", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {sections.map((s, i) => (
          <button key={i} onClick={() => setActiveSection(i)} style={{
            padding: "8px 16px", borderRadius: 20, border: "none",
            background: activeSection === i ? "#fff" : "rgba(255,255,255,0.06)",
            color: activeSection === i ? "#0a0a0f" : "#888",
            fontSize: 13, fontWeight: activeSection === i ? 600 : 400,
            cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.2s",
          }}>{s}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 24px", maxWidth: 720, margin: "0 auto" }}>

        {/* 账号定位 */}
        {activeSection === 0 && (
          <div>
            <SectionTitle emoji="🎯" title="账号定位" />
            <Card>
              <Row label="账号名称" value="LeapMind｜AI广告实验室" />
              <Row label="备选名称" value="GrowthGPT的日常 / 广告算法打工人" />
              <Row label="人设定位" value="一群做AI广告的年轻人，既懂技术又有趣" />
              <Row label="内容调性" value="70%生活感 + 30%专业感，轻松＞严肃" />
              <Row label="目标人群" value="广告从业者、电商老板、算法工程师、营销人" />
              <Row label="变现路径" value="品牌认知 → 产品咨询 → 合作/招聘" />
            </Card>

            <SectionTitle emoji="🏷️" title="简介模板" />
            <Card>
              <div style={{ fontSize: 14, lineHeight: 2, color: "#ccc" }}>
                <p style={{ margin: "0 0 4px" }}>🤖 一群做AI广告算法的年轻人</p>
                <p style={{ margin: "0 0 4px" }}>📊 用人话讲广告背后的算法逻辑</p>
                <p style={{ margin: "0 0 4px" }}>🎬 创业日常｜广告科普｜行业干货</p>
                <p style={{ margin: "0 0 4px" }}>💼 我们的产品：GrowthGPT（AI广告投放工具）</p>
                <p style={{ margin: 0 }}>📩 合作/加入我们：私信或留言</p>
              </div>
            </Card>

            <SectionTitle emoji="⚡" title="差异化策略" />
            {[
              { k: "不做什么", v: "不做纯技术论文解读、不做硬广、不做高高在上的专家人设" },
              { k: "一定要做", v: "真实办公场景、第一人称视角、用生活类比讲算法" },
              { k: "核心记忆点", v: "「用相亲/外卖/拼多多砍价来解释广告算法」这种风格" },
              { k: "竞品差异", v: "市面上广告科普账号偏严肃，我们走「搞笑+干货」路线" },
            ].map((item, i) => (
              <Card key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: "#FF6B6B", fontWeight: 600, marginBottom: 4 }}>{item.k}</div>
                <div style={{ fontSize: 14, color: "#ccc" }}>{item.v}</div>
              </Card>
            ))}
          </div>
        )}

        {/* 内容支柱 */}
        {activeSection === 1 && (
          <div>
            <SectionTitle emoji="📐" title="四大内容支柱" />
            {pillars.map((p, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 16, padding: 20, marginBottom: 16,
                borderLeft: `3px solid ${p.color}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{p.desc}</div>
                    </div>
                  </div>
                  <div style={{
                    background: p.color + "22", color: p.color,
                    padding: "4px 12px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                  }}>{p.ratio}</div>
                </div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>
                  转化逻辑：{p.hook}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {p.examples.map((ex, j) => (
                    <div key={j} style={{
                      background: "rgba(255,255,255,0.04)",
                      padding: "8px 12px", borderRadius: 8, fontSize: 13, color: "#aaa",
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      <span style={{ color: p.color, fontSize: 11 }}>●</span>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <SectionTitle emoji="🔄" title="内容比例思维导图" />
            <Card>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  {pillars.map((p, i) => (
                    <div key={i} style={{
                      width: `${parseInt(p.ratio) * 2.5}px`,
                      height: `${parseInt(p.ratio) * 2.5}px`,
                      borderRadius: "50%",
                      background: `${p.color}33`,
                      border: `2px solid ${p.color}`,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: p.color, fontWeight: 600,
                    }}>
                      <span style={{ fontSize: 20 }}>{p.icon}</span>
                      <span>{p.ratio}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: "#666", fontSize: 12, marginTop: 16 }}>
                  日常 40% → 让人关注 ｜ 科普 25% → 让人收藏 ｜ 产品 20% → 让人咨询 ｜ 招聘 15% → 让人私信
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* 月度计划 */}
        {activeSection === 2 && (
          <div>
            <SectionTitle emoji="📅" title="首月内容排期（每周3更）" />
            <div style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 12, padding: "12px 16px", marginBottom: 20,
              fontSize: 13, color: "#888", lineHeight: 1.8,
            }}>
              <strong style={{ color: "#ccc" }}>发布节奏：</strong>周一 / 周三 / 周五，各1篇<br />
              <strong style={{ color: "#ccc" }}>最佳时间：</strong>12:00-13:00 午休 ｜ 18:00-20:00 下班 ｜ 21:00-22:00 睡前<br />
              <strong style={{ color: "#ccc" }}>格式分配：</strong>图文轮播 40% ｜ 短视频 50% ｜ 9宫格 10%
            </div>

            {monthPlan.map((week, wi) => (
              <div key={wi} style={{ marginBottom: 12 }}>
                <button onClick={() => setExpandedWeek(expandedWeek === wi ? -1 : wi)} style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: "none", borderRadius: 12, padding: "14px 16px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", color: "#e8e6e3",
                }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{week.week}</span>
                    <span style={{ color: "#888", fontSize: 13, marginLeft: 10 }}>{week.theme}</span>
                  </div>
                  <span style={{ fontSize: 18, transition: "transform 0.2s", transform: expandedWeek === wi ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
                </button>

                {expandedWeek === wi && (
                  <div style={{ padding: "12px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                    {week.posts.map((post, pi) => (
                      <div key={pi} style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 12, padding: 16,
                        borderLeft: `3px solid ${colorMap[post.type] || "#888"}`,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{
                            background: (colorMap[post.type] || "#888") + "22",
                            color: colorMap[post.type] || "#888",
                            padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                          }}>{post.type}</span>
                          <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ color: "#666", fontSize: 12 }}>{post.day}</span>
                            <span style={{ color: "#555", fontSize: 12 }}>{post.format}</span>
                          </div>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{post.title}</div>
                        <div style={{ fontSize: 12, color: "#666" }}>💡 {post.tip}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 爆款脚本 */}
        {activeSection === 3 && (
          <div>
            <SectionTitle emoji="🎬" title={scriptTemplate.title} />
            <div style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 16, padding: 20, marginBottom: 20,
            }}>
              {scriptTemplate.structure.map((s, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, marginBottom: i < scriptTemplate.structure.length - 1 ? 20 : 0,
                  position: "relative",
                }}>
                  {i < scriptTemplate.structure.length - 1 && (
                    <div style={{
                      position: "absolute", left: 19, top: 40, bottom: -8,
                      width: 2, background: "rgba(255,255,255,0.06)",
                    }} />
                  )}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                    background: `hsl(${i * 60}, 70%, 50%, 0.15)`,
                    color: `hsl(${i * 60}, 70%, 60%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700,
                  }}>{s.time.split("-")[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 700, marginBottom: 4,
                      color: `hsl(${i * 60}, 70%, 60%)`,
                    }}>{s.name}（{s.time}）</div>
                    <div style={{
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 10, padding: "10px 14px", fontSize: 14,
                      color: "#ddd", lineHeight: 1.6, marginBottom: 6,
                    }}>"{s.content}"</div>
                    <div style={{ fontSize: 11, color: "#666" }}>📌 {s.tip}</div>
                  </div>
                </div>
              ))}
            </div>

            <SectionTitle emoji="📝" title="图文轮播脚本模板（6-8页）" />
            <Card>
              {[
                { page: "封面", content: "大字标题 + 反常识/数字钩子", example: "「广告算法工程师年薪50W，到底在干嘛？」" },
                { page: "P2", content: "痛点/共鸣", example: "你以为的广告投放 vs 实际的广告投放" },
                { page: "P3-P5", content: "核心干货（每页1个知识点）", example: "CTR预估 → 竞价排名 → 智能出价" },
                { page: "P6", content: "案例/数据佐证", example: "我们用AI优化后，客户ROI从1.2提升到3.8" },
                { page: "P7", content: "总结+行动指引", example: "3个你今天就能用的广告优化技巧" },
                { page: "尾页", content: "引导互动+账号介绍", example: "关注@LeapMind 更多广告干货 ｜ 合作私信" },
              ].map((p, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, padding: "10px 0",
                  borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <div style={{
                    width: 50, flexShrink: 0, fontSize: 11, fontWeight: 700,
                    color: "#FF8E53",
                  }}>{p.page}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{p.content}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>例：{p.example}</div>
                  </div>
                </div>
              ))}
            </Card>

            <SectionTitle emoji="🔥" title="爆款标题公式" />
            <Card>
              {[
                { formula: "数字 + 反常识", example: "面试100份简历，只有3份能用" },
                { formula: "身份 + 揭秘", example: "广告算法工程师的一天，比你想的无聊多了" },
                { formula: "对比 + 冲突", example: "AI投广告 vs 人工投广告，差距竟然这么大" },
                { formula: "提问 + 悬念", example: "为什么你的广告花了钱却没人点？" },
                { formula: "省钱/赚钱", example: "这个方法帮客户省了60%广告费" },
              ].map((f, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, padding: "8px 0",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  alignItems: "center",
                }}>
                  <div style={{
                    background: "#FF6B6B22", color: "#FF6B6B",
                    padding: "4px 10px", borderRadius: 8, fontSize: 11,
                    fontWeight: 600, whiteSpace: "nowrap",
                  }}>{f.formula}</div>
                  <div style={{ fontSize: 13, color: "#aaa" }}>{f.example}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* 运营策略 */}
        {activeSection === 4 && (
          <div>
            <SectionTitle emoji="📈" title="增长阶段规划" />
            {[
              {
                phase: "启动期（0-500粉）",
                time: "第1-2个月",
                color: "#FF6B6B",
                goals: ["每周3更，建立稳定节奏", "日常内容为主，建立人设", "互动率 > 粉丝数"],
                tactics: ["评论区互动，每条至少回复5条", "主动在同类账号下留有价值的评论", "蹭热点话题标签（广告投放、AI工具、职场日常）"],
              },
              {
                phase: "成长期（500-5000粉）",
                time: "第3-4个月",
                color: "#4ECDC4",
                goals: ["出1-2篇爆款（500+赞藏）", "科普内容占比提升", "开始收到合作私信"],
                tactics: ["投薯条测试爆款潜力（每篇50-100元）", "与同量级博主互推", "建立内容系列化（每周固定栏目）"],
              },
              {
                phase: "变现期（5000+粉）",
                time: "第5-6个月",
                color: "#45B7D1",
                goals: ["稳定的咨询/合作线索", "招聘帖有稳定曝光", "品牌认知度提升"],
                tactics: ["开始做产品软植入内容", "发布招聘专题内容", "尝试直播（算法科普/AMA）"],
              },
            ].map((p, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 16, padding: 20, marginBottom: 16,
                borderTop: `3px solid ${p.color}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: p.color }}>{p.phase}</span>
                  <span style={{ fontSize: 12, color: "#666" }}>{p.time}</span>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>目标</div>
                  {p.goals.map((g, j) => (
                    <div key={j} style={{ fontSize: 13, color: "#ccc", padding: "3px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: p.color }}>✓</span>{g}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 600 }}>打法</div>
                  {p.tactics.map((t, j) => (
                    <div key={j} style={{ fontSize: 13, color: "#aaa", padding: "3px 0", display: "flex", gap: 8 }}>
                      <span>→</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <SectionTitle emoji="⚠️" title="避坑清单" />
            <Card>
              {[
                "不要一上来就发产品广告，先用3-4周建立人设信任",
                "不要用专业术语堆砌，每个概念必须有生活化类比",
                "不要追求完美画面，真实感 > 精致感（小红书调性）",
                "不要忽略评论区，这是最好的互动和线索来源",
                "不要断更超过1周，算法会降权",
                "招聘帖不要硬发JD，要包装成故事或吐槽",
              ].map((tip, i) => (
                <div key={i} style={{
                  fontSize: 13, color: "#ccc", padding: "8px 0",
                  borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  display: "flex", gap: 10,
                }}>
                  <span style={{ color: "#FF6B6B" }}>✕</span>{tip}
                </div>
              ))}
            </Card>

            <SectionTitle emoji="🔧" title="工具推荐" />
            <Card>
              {[
                { tool: "剪映", use: "视频剪辑+字幕+模板", free: true },
                { tool: "Canva/稿定设计", use: "图文轮播制作", free: true },
                { tool: "新红/灰豚", use: "小红书数据分析", free: false },
                { tool: "薯条", use: "付费推广测试", free: false },
                { tool: "飞书多维表格", use: "内容排期管理", free: true },
              ].map((t, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{t.tool}</span>
                    <span style={{ fontSize: 12, color: "#666", marginLeft: 8 }}>{t.use}</span>
                  </div>
                  <span style={{
                    fontSize: 11, padding: "2px 8px", borderRadius: 6,
                    background: t.free ? "#4ECDC422" : "#FF6B6B22",
                    color: t.free ? "#4ECDC4" : "#FF6B6B",
                  }}>{t.free ? "免费" : "付费"}</span>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ emoji, title }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      marginBottom: 12, marginTop: 24,
    }}>
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h2>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderRadius: 14, padding: 18, marginBottom: 12,
      ...style,
    }}>{children}</div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{
      display: "flex", padding: "8px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <span style={{ width: 80, flexShrink: 0, fontSize: 13, color: "#888", fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, color: "#ddd" }}>{value}</span>
    </div>
  );
}
