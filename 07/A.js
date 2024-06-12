// Reads two integers and prints their sum
function func(num) {
  const n = reader.readline().split(" ")[0];
  let color = [];
  let dp = [];

  for (let i = 0; i < n; i++) {
    color[i] = [];
    dp[i] = [];

    const price = reader.readline().split(" ");
    color[i][0] = price[0];
    color[i][1] = price[1];
    color[i][2] = price[2];
  }

  dp[0][0] = color[0][0];
  dp[0][1] = color[0][1];
  dp[0][2] = color[0][2];
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + color[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + color[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + color[i][2];
  }
  console.log(
    `Case ${num}: ${Math.min(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2])}`,
  );
}

function main() {
  let t = reader.readline().split(" ")[0];
  for (let i = 0; i < t; i++) {
    func(i + 1);
  }
}
main();
