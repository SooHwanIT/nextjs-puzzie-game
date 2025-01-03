
# 프로젝트 개요

이 프로젝트는 **Next.js**와 **React**를 사용하여 제작된 **퍼즐 게임**입니다. 사용자는 다양한 모양의 퍼즐 조각을 드래그 앤 드롭하여 게임 보드에 배치할 수 있습니다. **React DnD** 라이브러리를 활용하여 드래그 앤 드롭 기능을 구현하였으며, 게임의 상태 관리와 조각 배치 로직을 포함하고 있습니다.

# 코드 구조

프로젝트는 주요 컴포넌트로 다음과 같이 구성되어 있습니다:

1. **HomePage.jsx**: 애플리케이션의 진입점으로, 게임의 초기 상태를 설정하고 주요 컴포넌트를 렌더링합니다.
2. **GameBoard.jsx**: 게임 보드를 나타내며, 퍼즐 조각의 드롭 및 배치 로직을 처리합니다.
3. **Shape.jsx**: 드래그 가능한 퍼즐 조각을 나타내며, 각 조각의 모양과 색상을 렌더링합니다.

# 주요 기능 및 코드 분석

## 1. HomePage.jsx

### 상태 관리

- **`gridState`**: 게임 보드의 현재 상태를 나타내는 6x6 2차원 배열로, 각 셀의 상태를 저장합니다.
- **`shapes`**: 사용자가 배치할 수 있는 퍼즐 조각들의 배열로, 각 조각의 모양과 위치 정보를 포함합니다.

```jsx
const [gridState, setGridState] = useState(
  Array.from({ length: 6 }, () => Array(6).fill(null))
);
const [shapes, setShapes] = useState(initialShapes);
```

### DndProvider

- **`DndProvider`**: React DnD의 `DndProvider`를 사용하여 드래그 앤 드롭 기능을 제공합니다.

```jsx
<DndProvider backend={HTML5Backend}>
  {/* ... */}
</DndProvider>
```

### Shape 드롭 처리

- **`handleShapeDrop`**: 퍼즐 조각이 보드에 드롭될 때 호출되어 상태를 업데이트합니다.

```jsx
const handleShapeDrop = (id, newPosition) => {
  // shapes 상태 업데이트
  // gridState 업데이트
};
```

## 2. GameBoard.jsx

### 드롭 영역 설정

- **`useDrop`**: 게임 보드가 드롭 가능한 영역임을 정의하고, 드롭 및 호버 시의 동작을 설정합니다.

```jsx
const [, drop] = useDrop({
  accept: "SHAPE",
  hover: (item, monitor) => {
    // 프리뷰 위치 업데이트
  },
  drop: (item, monitor) => {
    // 조각 배치 및 상태 업데이트
  },
});
```

### 위치 계산 함수

- **`getGridPosition`**: 마우스의 클라이언트 좌표를 보드의 그리드 좌표로 변환합니다.

```jsx
const getGridPosition = (offset, boardRect) => {
  // 클라이언트 좌표를 그리드 좌표로 변환
};
```

- **`canPlaceShape`**: 특정 위치에 조각을 배치할 수 있는지 검사합니다.

```jsx
const canPlaceShape = (shape, grid, position) => {
  // 배치 가능 여부 확인
};
```

- **`placeShape`**: 조각을 보드에 배치하고 `gridState`를 업데이트합니다.

```jsx
const placeShape = (shape, position, previousPosition) => {
  // gridState 업데이트
};
```

### 렌더링

- **보드 그리드 렌더링**: 보드의 각 셀을 렌더링하고, 프리뷰 상태를 반영합니다.
- **배치된 조각 렌더링**: 보드 위에 배치된 조각들을 절대 위치로 렌더링합니다.

```jsx
return (
  <div ref={drop} className={styles.gameBoard}>
    {gridState.map(/* ... */)}
    {shapes.map(/* ... */)}
  </div>
);
```

## 3. Shape.jsx

### 드래그 기능 구현

- **`useDrag`**: 퍼즐 조각이 드래그 가능하도록 설정하고, 드래그 시 전달할 데이터를 정의합니다.

```jsx
const [{ isDragging }, drag] = useDrag({
  type: "SHAPE",
  item: () => ({
    id: shapeData.id,
    shape: shapeData.shape,
    previousPosition: shapeData.position,
  }),
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
});
```

### 색상 지정

- **`shapeColors`**: 각 조각은 고유의 ID에 기반한 색상을 가집니다.

```jsx
const shapeColors = [
  "#FF5733",
  "#33FF57",
  // ...
];
```

### 렌더링

- **조각의 모양 렌더링**: 2차원 배열인 `shapeData.shape`를 순회하여 각 셀을 렌더링합니다.

```jsx
return (
  <div
    ref={ref}
    className={styles.shape}
    style={{ /* ... */ }}
  >
    {shapeData.shape.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.row}>
        {row.map((cell, colIndex) => (
          // 셀 렌더링
        ))}
      </div>
    ))}
  </div>
);
```

# 주요 로직 설명

## 드래그 앤 드롭 구현

- **React DnD 활용**: `useDrag`와 `useDrop` 훅을 사용하여 퍼즐 조각과 보드의 드래그 및 드롭 기능을 구현하였습니다.
- **아이템 데이터**: 드래그 시 조각의 ID, 모양, 이전 위치 등의 데이터를 전달하여 드롭 시 활용합니다.

## 퍼즐 조각 배치 로직

- **드롭 처리**: 사용자가 조각을 드롭하면 `GameBoard` 컴포넌트의 `drop` 함수가 호출됩니다.
- **위치 계산 및 검증**:
  - **`getGridPosition`** 함수를 통해 드롭 위치를 그리드 좌표로 변환합니다.
  - **`canPlaceShape`** 함수를 통해 해당 위치에 조각을 배치할 수 있는지 확인합니다.
- **상태 업데이트**:
  - **`placeShape`** 함수를 호출하여 `gridState`를 업데이트하고, 조각의 위치 정보를 갱신합니다.
  - 이전 위치에 있던 조각은 제거하고, 새로운 위치에 조각을 배치합니다.

## 상태 관리 및 렌더링

- **React 상태 관리**: 조각의 위치와 보드의 상태를 React의 상태 관리로 유지하여, UI에 실시간으로 반영합니다.
- **조건부 렌더링**: 조각이 보드에 배치되었는지 여부에 따라 렌더링 위치를 결정합니다.

# 결론

이 프로젝트는 **Next.js**와 **React DnD**를 활용하여 퍼즐 게임의 핵심 기능인 **드래그 앤 드롭**과 **조각 배치 로직**을 구현하였습니다. 주요 컴포넌트들의 역할과 상호 작용을 통해 사용자에게 직관적인 퍼즐 게임 경험을 제공합니다. React의 상태 관리와 라이브러리 활용을 통해 효율적인 코드 구조를 유지하였습니다.
