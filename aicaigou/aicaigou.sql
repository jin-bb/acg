SET NAMES UTF8;
DROP DATABASE IF EXISTS acg;
CREATE DATABASE acg CHARSET=UTF8;
USE acg;
CREATE TABLE acg_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  user_name VARCHAR(32),      #用户名，如王小明
  gender INT                  #性别  0-女  1-男
);

INSERT INTO acg_user VALUES
(NULL, 'dongdong', '123456', 'dong@qq.com', '15648954647', '凌一维', '1'),
(NULL, 'dahffa', '123456', 'dahffa@qq.com', '13501234568', '林当然', '1'),
(NULL, 'gurgrd', '123456', 'gurgrd@qq.com', '13501234569', '戴志强', '1'),
(NULL, 'fhafhuif', '123456', 'fhafhuif@qq.com', '13501234560', '黄可见', '1'),
(NULL, 'peter', '123456', 'peter@qq.com', '13501234560', '张家宝', '1'),
(NULL, 'kiac', '123456', 'kiac@qq.com', '13501234560', '赵君', '0'),
(NULL, 'lianc', '123456', 'kiac@qq.com', '13501234560', '周洁洁', '0');

CREATE TABLE acg_snacks(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128),         #标题
  price DECIMAL(10,2),        #价格
  promise VARCHAR(64),        #服务承诺
  spec VARCHAR(32),           #质量
  stores VARCHAR(32),   #店铺信息
  exp VARCHAR(32),     #保质期
  variety  VARCHAR(32), #品种
  storage_method VARCHAR(32) #储蓄方法
);

INSERT INTO acg_snacks VALUES
(1, '趣园饼干生产厂家批发小零食薯片', 6.9, '资质已核查企业上传营业执照，经爱采购审核与企业工商注册信息一致已通过真实性认证','108g', '广东趣园食品有限公司', '9个月','饼干','常温干燥'),
(2, '魔芋素毛肚素百叶旗肚', 5.0, '资质已核查企业上传营业执照.','300g', '山东飨将食品科技有限公司', '12个月','魔芋食材','密封后放于阴凉干燥处 '),
(3, '渝业卤猪耳 ', 15.2, '资质已核查企业上传营业执照.', '150g', '重庆市渝业食品有限公司 ', '9个月','卤味','常温干燥'),
(4, '陕西网红小零食批发 ', 50, '资质已核查企业上传营业执照.', '200g', '惠州市车大炮汽车贸易有限公司 ', '3-60天','蛋糕','常温干燥'),
(5, '猫大师无蔗糖沙琪玛零食整箱礼盒无糖精软糯糕 ', 35.0, '资质已核查企业上传营业执照，经爱采购审核与企业工商注册信息一致已通过真实性认证 ', '1000g', '江苏猫乐食品有限公司 ', '300天 ','曲奇饼干 ','常温保存 '),
(6, '花生牛轧糖 ', 6.0, '资质已核查企业上传营业执照，经爱采购审核与企业工商注册信息一致已通过真实性认证 ', '500g', '山东聊城好倍可食品有限公司 ', '10个月','软糖','阴凉干燥处 密封保存 '),
(7, '重庆烧烤小豆干 ', 3.0, '资质已核查企业上传营业执照，经爱采购审核与企业工商注册信息一致已通过真实性认证 ', '80g', '重庆市食友食品开发有限公司 ', '9个月','大豆类','阴凉干燥处');

CREATE TABLE acg_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id INT,   #商品编号
  count INT        #购买数量
);