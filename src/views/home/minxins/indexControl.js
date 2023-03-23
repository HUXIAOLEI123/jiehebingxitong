import F360000_full from '../regionJSON/360000_full.json';
import F360400_full from '../regionJSON/360400_full.json';
import F360100_full from '../regionJSON/360100_full.json';
import F361100_full from '../regionJSON/361100_full.json';
import F361000_full from '../regionJSON/361000_full.json';
import F360900_full from '../regionJSON/360900_full.json';
import F360800_full from '../regionJSON/360800_full.json';
import F360700_full from '../regionJSON/360700_full.json';
import F360200_full from '../regionJSON/360200_full.json';
import F360300_full from '../regionJSON/360300_full.json';
import F360500_full from '../regionJSON/360500_full.json';
import F360600_full from '../regionJSON/360600_full.json';
import F360402 from '../regionJSON/360402.json';
import F360404 from '../regionJSON/360404.json';
import F360423 from '../regionJSON/360423.json';
import F360425 from '../regionJSON/360425.json';
import F360426 from '../regionJSON/360426.json';
import F360429 from '../regionJSON/360429.json';
import F360430 from '../regionJSON/360430.json';
import F360481 from '../regionJSON/360481.json';
import F360482 from '../regionJSON/360482.json';
import F360483 from '../regionJSON/360483.json';
import F360102 from '../regionJSON/360102.json';
import F360103 from '../regionJSON/360103.json';
import F360104 from '../regionJSON/360104.json';
import F360111 from '../regionJSON/360111.json';
import F360112 from '../regionJSON/360112.json';
import F360113 from '../regionJSON/360113.json';
import F360121 from '../regionJSON/360121.json';
import F360123 from '../regionJSON/360123.json';
import F360124 from '../regionJSON/360124.json';
import F361102 from '../regionJSON/361102.json';
import F361103 from '../regionJSON/361103.json';
import F361104 from '../regionJSON/361104.json';
import F361123 from '../regionJSON/361123.json';
import F361124 from '../regionJSON/361124.json';
import F361125 from '../regionJSON/361125.json';
import F361126 from '../regionJSON/361126.json';
import F361127 from '../regionJSON/361127.json';
import F361128 from '../regionJSON/361128.json';
import F361129 from '../regionJSON/361129.json';
import F361130 from '../regionJSON/361130.json';
import F361181 from '../regionJSON/361181.json';
import F361002 from '../regionJSON/361002.json';
import F361003 from '../regionJSON/361003.json';
import F361021 from '../regionJSON/361021.json';
import F361022 from '../regionJSON/361022.json';
import F361023 from '../regionJSON/361023.json';
import F361024 from '../regionJSON/361024.json';
import F361025 from '../regionJSON/361025.json';
import F361026 from '../regionJSON/361026.json';
import F361027 from '../regionJSON/361027.json';
import F361028 from '../regionJSON/361028.json';
import F361030 from '../regionJSON/361030.json';
import F360902 from '../regionJSON/360902.json';
import F360921 from '../regionJSON/360921.json';
import F360922 from '../regionJSON/360922.json';
import F360923 from '../regionJSON/360923.json';
import F360924 from '../regionJSON/360924.json';
import F360925 from '../regionJSON/360925.json';
import F360926 from '../regionJSON/360926.json';
import F360981 from '../regionJSON/360981.json';
import F360982 from '../regionJSON/360982.json';
import F360983 from '../regionJSON/360983.json';
import F360802 from '../regionJSON/360802.json';
import F360803 from '../regionJSON/360803.json';
import F360821 from '../regionJSON/360821.json';
import F360822 from '../regionJSON/360822.json';
import F360823 from '../regionJSON/360823.json';
import F360824 from '../regionJSON/360824.json';
import F360825 from '../regionJSON/360825.json';
import F360826 from '../regionJSON/360826.json';
import F360827 from '../regionJSON/360827.json';
import F360828 from '../regionJSON/360828.json';
import F360829 from '../regionJSON/360829.json';
import F360830 from '../regionJSON/360830.json';
import F360881 from '../regionJSON/360881.json';
import F360702 from '../regionJSON/360702.json';
import F360703 from '../regionJSON/360703.json';
import F360704 from '../regionJSON/360704.json';
import F360722 from '../regionJSON/360722.json';
import F360723 from '../regionJSON/360723.json';
import F360724 from '../regionJSON/360724.json';
import F360726 from '../regionJSON/360726.json';
import F360728 from '../regionJSON/360728.json';
import F360729 from '../regionJSON/360729.json';
import F360730 from '../regionJSON/360730.json';
import F360731 from '../regionJSON/360731.json';
import F360732 from '../regionJSON/360732.json';
import F360733 from '../regionJSON/360733.json';
import F360734 from '../regionJSON/360734.json';
import F360735 from '../regionJSON/360735.json';
import F360781 from '../regionJSON/360781.json';
import F360783 from '../regionJSON/360783.json';
import F360202 from '../regionJSON/360202.json';
import F360203 from '../regionJSON/360203.json';
import F360222 from '../regionJSON/360222.json';
import F360281 from '../regionJSON/360281.json';
import F360302 from '../regionJSON/360302.json';
import F360313 from '../regionJSON/360313.json';
import F360321 from '../regionJSON/360321.json';
import F360322 from '../regionJSON/360322.json';
import F360323 from '../regionJSON/360323.json';
import F360502 from '../regionJSON/360502.json';
import F360521 from '../regionJSON/360521.json';
import F360602 from '../regionJSON/360602.json';
import F360603 from '../regionJSON/360603.json';
import F360681 from '../regionJSON/360681.json';

export default {
  data() {
    return {
      JiangxiProvince: F360000_full,
      city: {
        九江市: F360400_full,
        南昌市: F360100_full,
        上饶市: F361100_full,
        抚州市: F361000_full,
        宜春市: F360900_full,
        吉安市: F360800_full,
        赣州市: F360700_full,
        景德镇市: F360200_full,
        萍乡市: F360300_full,
        新余市: F360500_full,
        鹰潭市: F360600_full,
      },
      county: {
        九江市: {
          濂溪区: F360402,
          柴桑区: F360404,
          武宁县: F360423,
          永修县: F360425,
          德安县: F360426,
          湖口县: F360429,
          彭泽县: F360430,
          瑞昌市: F360481,
          共青城市: F360482,
          庐山市: F360483,
        },
        南昌市: {
          东湖区: F360102,
          西湖区: F360103,
          青云谱区: F360104,
          青山湖区: F360111,
          新建区: F360112,
          红谷滩区: F360113,
          南昌县: F360121,
          安义县: F360123,
          进贤县: F360124,
        },
        上饶市: {
          信州区: F361102,
          广丰区: F361103,
          广信区: F361104,
          玉山县: F361123,
          铅山县: F361124,
          横峰县: F361125,
          弋阳县: F361126,
          余干县: F361127,
          鄱阳县: F361128,
          万年县: F361129,
          婺源县: F361130,
          德兴市: F361181,
        },
        抚州市: {
          临川区: F361002,
          东乡区: F361003,
          南城县: F361021,
          黎川县: F361022,
          南丰县: F361023,
          崇仁县: F361024,
          乐安县: F361025,
          宜黄县: F361026,
          金溪县: F361027,
          资溪县: F361028,
          广昌县: F361030,
        },
        宜春市: {
          袁州区: F360902,
          奉新县: F360921,
          万载县: F360922,
          上高县: F360923,
          宜丰县: F360924,
          靖安县: F360925,
          铜鼓县: F360926,
          丰城市: F360981,
          樟树市: F360982,
          高安市: F360983,
        },
        吉安市: {
          吉州区: F360802,
          青原区: F360803,
          吉安县: F360821,
          吉水县: F360822,
          峡江县: F360823,
          新干县: F360824,
          永丰县: F360825,
          泰和县: F360826,
          遂川县: F360827,
          万安县: F360828,
          安福县: F360829,
          永新县: F360830,
          井冈山市: F360881,
        },
        赣州市: {
          章贡区: F360702,
          南康区: F360703,
          赣县区: F360704,
          信丰县: F360722,
          大余县: F360723,
          上犹县: F360724,
          崇义县: F360723,
          安远县: F360726,
          定南县: F360728,
          全南县: F360729,
          宁都县: F360730,
          于都县: F360731,
          兴国县: F360732,
          会昌县: F360733,
          寻乌县: F360734,
          石城县: F360735,
          瑞金市: F360781,
          龙南市: F360783,
        },
        景德镇市: {
          昌江区: F360202,
          珠山区: F360203,
          浮梁县: F360222,
          乐平市: F360281,
        },
        萍乡市: {
          安源区: F360302,
          湘东区: F360313,
          莲花县: F360321,
          上栗县: F360322,
          芦溪县: F360323,
        },
        新余市: {
          渝水区: F360502,
          分宜县: F360521,
        },
        鹰潭市: {
          月湖区: F360602,
          余江区: F360603,
          贵溪市: F360681,
        },
      },
    };
  },
};
