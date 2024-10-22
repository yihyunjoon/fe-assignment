# 브랜더진 프론트엔드 과제

## 🤖 AI 이미지 검색 API를 활용한 이미지 그리드 프리로드 렌더링

[preload](https://github.com/user-attachments/assets/5a0b3527-f3b5-4eb2-8339-cf057d675d32)

### 🚀 프로젝트 세팅

프로젝트를 시작하려면 다음 단계를 따라주세요:

```sh
corepack enable
pnpm install
pnpm dev
```

### 🔗 제공 API

키워드를 통해 관련된 이미지를 반환하는 AI 기반 API입니다. 브랜더진 사내에서 사용하는 API를 변형하여 제공한 것으로 실제로 작동하는 API입니다. 과제를 진행하며 아무 키워드를 입력해 검색 결과를 확인해 보세요!

```
[Redacted: 과제 시작 시 전달드립니다.]

Query Parameters
* query: string
* limit: number

Header(s)
* Authorization: Bearer {token}
```

💡 **참고 (선택)**: API 요청 시 1/10 확률로 500 에러가 발생합니다. 이는 의도된 응답으로 에러 발생 케이스를 고려하여 코드를 작성해 주시기를 부탁드립니다.

### 🛠️ 프로젝트 환경

* 이 프로젝트에는 다음과 같은 라이브러리가 기본으로 추가되어 있습니다. 필요에 따라 다른 CSS/JS 라이브러리를 추가하여 사용하셔도 좋습니다.
  * [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)
  * [tailwindcss](https://tailwindcss.com/)
  * [shadcn/ui](https://ui.shadcn.com/)
* 프로젝트에는 두 개의 입력 필드가 존재합니다:
   * 첫 번째는 검색 키워드를 입력하는 필드입니다. (예: 파란색 옷을 입은 사람, 브이하는 사람, etc.)
   * 두 번째는 가져올 이미지 수를 지정하는 필드입니다.

### 📋 요구사항

* 제공해 드리는 이미지 검색 API와 토큰을 이용하여 `src/lib/data.ts` 파일에서 `searchQuery` 함수를 완성해 주세요.
* 완성한 `searchQuery` 함수를 사용하여, `src/pages/search.tsx` 파일에서 아래 요구사항에 맞는 그리드를 완성해야 합니다.
* 데이터를 fetch하는 동안 로딩 화면은 `src/components/fallback.tsx`의 `<Fallback />` 컴포넌트를 사용해 주세요.
* 이미지는 비율을 유지하면서 잘려서 화면에 가득 차도록 표시해야 합니다.
* 이미지는 그리드 레이아웃으로 표시되어야 합니다:
   * 그리드 간 간격은 4px입니다.
   * 4칸을 차지하는 그리드 섹션은 3번째 줄에서 4번째 줄 우측에 위치하며, 이 패턴은 이미지 개수와 상관없이 반복됩니다.
   * 몇 번째 이미지가 4칸을 차지할지는 중요하지 않으며, 데이터 개수에 맞게 그리드가 구성되면 됩니다.
   * 예를 들어, 이미지가 9개일 때는 마지막 4칸을 차지하지만 10~17개일 때는 4칸을 차지하는 요소 없이 3x3 형태로 렌더링됩니다. 다시 18개라면 마지막 요소가 4칸을 차지해야 합니다. 이 패턴은 이미지 개수가 n개여도 동일하게 작동해야 합니다.
   <details>
     <summary>👉 <strong>예시 확인하기</strong> 👈</summary>
      <table>
          <tr>
              <td><img src="https://github.com/user-attachments/assets/f20c45b9-67f1-471c-b339-3a262c0fcd6b" alt="_5" style="width: 150px; height: auto;"></td>
              <td><img src="https://github.com/user-attachments/assets/74c7d423-9a79-4474-8d66-beaeec670b79" alt="_8" style="width: 150px; height: auto;"></td>
              <td><img src="https://github.com/user-attachments/assets/4547c40a-1c08-4ceb-9872-b004c0efe4e2" alt="_9" style="width: 150px; height: auto;"></td>
              <td><img src="https://github.com/user-attachments/assets/91ac0c7a-d128-49f7-b4e3-c6633c67ca4d" alt="_17" style="width: 150px; height: auto;"></td>
              <td><img src="https://github.com/user-attachments/assets/5eeb1c3a-bbe5-4d84-aa2c-699164449a3f" alt="_18" style="width: 150px; height: auto;"></td>
              <td><img src="https://github.com/user-attachments/assets/3577abd6-8fe8-4337-9506-d5eb1478f6d7" alt="_20" style="width: 150px; height: auto;"></td>
          </tr>
          <tr>
              <td style="text-align: center;">limit: 5</td>
              <td style="text-align: center;">limit: 8</td>
              <td style="text-align: center;">limit: 9</td>
              <td style="text-align: center;">limit: 17</td>
              <td style="text-align: center;">limit: 18</td>
              <td style="text-align: center;">limit: 20</td>
          </tr>
      </table>
   </details>
* 자연스러운 사용자 경험을 위해 API에서 이미지를 가져온 후 모든 이미지가 동시에 표시되도록 구현해 주셔야 합니다. 목표 동작에 맞게 API fetch 이후 모든 이미지가 한번에 뜨는 것을 구현해 주세요.
  * **현재 동작 (as-is):** 이미지가 하나씩 로드되고 렌더링됩니다.
  * **목표 동작 (to-be):** 모든 이미지 요소가 함께 렌더링되어 사용자가 매끄러운 경험을 할 수 있도록 합니다.
  <details>
     <summary>👉 <strong>예시 동작 확인하기</strong> 👈</summary>

     <table width=100%>
          <tr>
              <td><video src="https://github.com/user-attachments/assets/dc7e12c6-392f-4753-9f97-f6c9f224fd7d" /></td>
              <td><video src="https://github.com/user-attachments/assets/5a0b3527-f3b5-4eb2-8339-cf057d675d32"></td>
          </tr>
          <tr>
              <td style="text-align: center;">As-is</td>
              <td style="text-align: center;">To-be</td>
          </tr>
      </table>
  </details>

* 이미지를 클릭했을 때 API 응답에 있는 `shortcode`를 이용하여 새 탭에서 `https://www.instagram.com/p/:shortcode`로 이동되어야 합니다.
  * 새 탭을 띄울 때 해당 탭에서 어느 페이지를 통해 페이지에 도달(document.referrer, window.opener)했는 지 알 수 없어야 합니다.

### 참고사항

필요한 기능을 구현하거나 사용자 경험을 개선하기 위해 추가적인 라이브러리를 설치해도 괜찮습니다.

## 🔒 저작권 및 외부 유출 금지 안내

이 과제에서 제공되는 모든 소스 코드, API 및 문서, 제출해주신 결과물은 주식회사 인에디트의 자산으로 귀속됩니다.

