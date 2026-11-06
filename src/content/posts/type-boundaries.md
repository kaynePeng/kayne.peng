---
title: 把类型收紧在边界上：Vue 3 + TypeScript 的四个习惯
date: 2026-08-27
tags: TypeScript, Vue, 实践
summary: 类型不是贴满全项目的装饰。把力气花在组件边界、接口与失败路径上，收益最高。
---

在 Vue 项目里，TypeScript 最常见的用法是给 `ref` 加一个泛型，然后就不再管它。这不算错，但也没解决真正的问题：类型该放的地方往往不在组件内部，而在**边界**上。

下面四个习惯，是我在几个中型项目里反复用到的。

## 一、props 用类型而不是运行时校验

`defineProps` 的泛型写法会把类型直接变成编译期约束，比 `props: { title: String }` 这种运行时校验早一步拦住错误：

```ts
interface Props {
  title: string
  tags?: string[]
  date: string
}

const props = withDefaults(defineProps<Props>(), {
  tags: () => [],
})
```

注意 `withDefaults` 对数组和对象要给工厂函数，否则多个实例会共享同一个引用——这类 bug 只在特定交互下出现，很难查。

## 二、把接口的返回类型先写出来

调用后端接口时，先写 `interface`，再写请求函数。顺序反过来会变成「后端返回什么，类型就长什么样」，最后类型变成一堆可选字段的堆叠。

一个可用的原则：**可选字段只留给真的可能不存在的值**，不要用 `?` 掩盖自己没确认过的字段。

## 三、让失败路径也有类型

很多代码里 `catch` 的写法是 `catch (e) { console.error(e) }`，等于放弃了这里的信息。稍好一点：

```ts
class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
  }
}
```

这样上层至少能根据 `status` 决定是重试、提示，还是引导用户重新登录。

## 四、用 `unknown` 收口，而不是 `any`

从 `JSON.parse`、`localStorage`、第三方回调里拿到的值，类型都是不可信的。先用 `unknown` 接住，再写一个窄化函数：

```ts
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
```

多写这几行，比事后追查「为什么某个字段突然是 undefined」要便宜得多。

## 小结

类型系统的收益不在覆盖率，而在**关键位置是否准确**。组件对外暴露的 props、接口的输入输出、失败的分支，这三处写对了，剩下的部分自然不容易错。
