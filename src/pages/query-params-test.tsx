import { useRouter } from "next/router";
import { useState } from "react";

function QueryParamsTest() {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = useState(Number(query.page) || 1);
  const [limit, setLimit] = useState(Number(query.limit) || 10);
  const [search, setSearch] = useState((query.search as string) || "");
}

export default QueryParamsTest;
