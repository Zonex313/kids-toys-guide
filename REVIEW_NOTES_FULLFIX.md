# 全量审查整改说明（Full-review FAIL fix）

**时间：** 2026-10-10 11:12:57 Asia/Shanghai
**线上：** https://zonex313.github.io/kids-toys-guide/
**依据：** `/workspace/full-review-report.md` + `full-review-findings.json`

## 结果总览

| 指标 | 数值 |
|------|------:|
| 整改前唯一模型 | 7771 |
| 整改后唯一模型 | 7757 |
| 全站移除（唯一 ID） | **14** |
| 文案重写（唯一 ID） | **34** |

### 各年龄层数量

| 年龄 | 整改前 | 整改后 |
|------|------:|------:|
| 0-1 | 106 | 106 |
| 1-2 | 1118 | 1114 |
| 2-3 | 2429 | 2419 |
| 3-4 | 5266 | 5262 |
| 4-5 | 4247 | 4242 |
| 5-6 | 4940 | 4935 |
| 6-7 | 1612 | 1609 |
| 7-8 | 1181 | 1181 |

## id → action 对照表

| id | 处理 | 说明 |
|----|------|------|
| `79546` | rewrite_vehicle_from_articulated | 车辆 79546 → 去掉关节模板 |
| `248544` | rewrite_vehicle_from_articulated | 车辆 248544 → 去掉关节模板 |
| `250874` | rewrite_vehicle_from_articulated | 车辆 250874 → 去掉关节模板 |
| `427560` | rewrite_zahlensteine | Zahlensteine → 数字石块文案 |
| `585180` | remove_sitewide:jewelry_organizer | 1980's rubber bracelets |
| `598175` | remove_sitewide:jewelry_organizer | Bracelet/rings holder |
| `624786` | remove_sitewide:jewelry_organizer | Ribbed Stacking Jewelry Bowl |
| `701721` | rewrite_cable_car | Cable Car → 车辆文案 |
| `728123` | remove_sitewide:military_fighter | 趣味拼装战斗机 |
| `821062` | rewrite_vehicle_from_articulated | 车辆 821062 → 去掉关节模板 |
| `847806` | rewrite_vehicle_from_articulated | 车辆 847806 → 去掉关节模板 |
| `907056` | rewrite_loader_stem | Toy Loader → 螺丝组装STEM文案 |
| `1135609` | remove_sitewide:jewelry_organizer | Dino Ring Holder Tray |
| `1264629` | remove_sitewide:jewelry_organizer | Stacking bracelet bead tray |
| `1267703` | rewrite_vehicle_from_articulated | 车辆 1267703 → 去掉关节模板 |
| `1283740` | remove_sitewide:jewelry_organizer | Stacking bracelet bead tray V2 |
| `1483037` | rewrite_vehicle_from_articulated | 车辆 1483037 → 去掉关节模板 |
| `1601774` | rewrite_puzzle_from_articulated | Dilophosaurus 3D-Puzzle → 拼图文案 |
| `1619093` | remove_sitewide:jewelry_organizer | Cute Little cat / Ring holder |
| `1650045` | rewrite_color_car | 智趣彩拼车 → 彩拼车文案 |
| `1657250` | remove_sitewide:military_fighter | 隐身飞机/战斗机（挂弹） |
| `1657254` | remove_sitewide:military_fighter | 宇宙飞船/战斗机 |
| `1756325` | rewrite_puzzle_from_articulated | Kit Card Piggy Van → 拼图文案 |
| `1848883` | rewrite_puzzle_from_articulated | Cube Puzzle → 拼图文案 |
| `2139994` | remove_sitewide:military_fighter | 战斗机插板玩具 |
| `2210959` | rewrite_puzzle_from_articulated | 猫咪总动员拼图 → 拼图文案 |
| `2319990` | rewrite_vehicle_from_articulated | 车辆 2319990 → 去掉关节模板 |
| `2441032` | rewrite_vehicle_from_articulated | 车辆 2441032 → 去掉关节模板 |
| `2450444` | rewrite_vehicle_from_articulated | 车辆 2450444 → 去掉关节模板 |
| `2498365` | remove_sitewide:jewelry_organizer | Stacking trays / Jewelry Box |
| `2534887` | remove_sitewide:military_fighter | WZ-02「狂刃」无人作战战车 |
| `2542231` | rewrite_vehicle_from_articulated | 车辆 2542231 → 去掉关节模板 |
| `2556950` | remove_sitewide:military_fighter | 喷火式战斗机立体拼图 |
| `2696790` | rewrite_vehicle_from_articulated | 车辆 2696790 → 去掉关节模板 |
| `2767429` | rewrite_vehicle_from_articulated | 车辆 2767429 → 去掉关节模板 |
| `2771899` | rewrite_seaplane | Q版拼装水上飞机 → 车辆文案 |
| `2854564` | rewrite_puzzle_from_articulated | Cat 3D Puzzle → 拼图文案 |
| `2866919` | rewrite_puzzle_from_articulated | Puzzle Teddy Bear → 拼图文案+cat |
| `2891743` | rewrite_puzzle_from_articulated | Puzzle Train → 拼图文案+cat |
| `2977617` | rewrite_vehicle_from_articulated | 车辆 2977617 → 去掉关节模板 |
| `3098069` | rewrite_vehicle_from_articulated | 车辆 3098069 → 去掉关节模板 |
| `3227497` | rewrite_stacking_from_articulated | The Pig Block → 堆叠文案 |
| `3228183` | rewrite_stacking_from_articulated | The Chicken Block → 堆叠文案 |
| `3228543` | rewrite_stacking_from_articulated | The Cow Block → 堆叠文案 |
| `3230984` | rewrite_stacking_from_articulated | The Horse Block → 堆叠文案 |
| `3232925` | rewrite_stacking_from_articulated | The Sheep Block → 堆叠文案 |
| `3278420` | rewrite_puzzle_from_articulated | 铲车两头忙立体拼装 → 拼图文案 |
| `3375288` | rewrite_puzzle_from_articulated | Mutadon → 拼图文案 |

## 分组说明

### A. 首饰/手镯/收纳 — 全站移除

非儿童玩具或低龄不宜：手镯、戒指托、首饰碗/托盘等。

IDs: `[585180, 598175, 624786, 1135609, 1264629, 1283740, 1619093, 2498365]`

### B. 文案错配 — 重写 intro/play

- 堆叠/拼图误用「带活动关节」模板 → 改为拼图或堆叠文案
- 非积木模型 intro 误称积木 → 按标题改写
- 907056 装载机误称拼图 → 螺丝组装 STEM 文案
- 车辆误用关节模板（discuss）→ 改为车辆推拉文案

### C. 战斗机/无人作战 — 全站移除（降低后续打回）

IDs: `[728123, 1657250, 1657254, 2139994, 2534887, 2556950]`

## 验证

- 阻断移除 ID 全部 ABSENT：True
- 历史 must-absent 无复发：True
- 错配文案不再含「带活动关节」/错误积木/装载机拼图：True
- summary.total：7757

审计：`/workspace/bambu-kids-toys/bulk/checkpoints/fullfix_audit.json`
