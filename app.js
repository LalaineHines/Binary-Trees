import Tree from "./BST.js";

function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function () {
        return Math.round(Math.random() * max);
    });
}

function driverScript() {
    // Create a binary search tree from an array of random numbers < 100
    const tree = new Tree(randomArray(15, 100));
    // Confirm that the tree is balanced by calling isBalanced
    console.log(tree.isBalanced());

    // Print out all elements in level, pre, post, and in order.
    console.log("Level Order");
    tree.levelOrderForEach((val) => console.log(val.data));
    console.log("In Order");
    tree.inOrderForEach((val) => console.log(val.data));
    console.log("Pre Order");
    tree.preOrderForEach((val) => console.log(val.data));
    console.log("Post Order");
    tree.postOrderForEach((val) => console.log(val.data));

    // Unbalance the tree by adding several numbers > 100.
    const randomNewNumbers = randomArray(20, 100);
    randomNewNumbers.forEach((val) => tree.insert(val));
    // Confirm that the tree is unbalanced by calling isBalanced
    console.log(tree.isBalanced());

    // Balance the tree by calling rebalance.
    console.log(tree.rebalance());
    // Confirm that the tree is balanced by calling isBalanced
    console.log(tree.isBalanced());

    // Print out all elements in level, pre, post, and in order.

    console.log("Level Order after rebalance 🔥");
    tree.levelOrderForEach((val) => console.log(val.data));
    console.log("In Order after rebalance 🔥");
    tree.inOrderForEach((val) => console.log(val.data));
    console.log("Pre Order after rebalance 🔥");
    tree.preOrderForEach((val) => console.log(val.data));
    console.log("Post Order after rebalance 🔥");
    tree.postOrderForEach((val) => console.log(val.data));

    console.log("Final look of the Tree:");
    tree.prettyPrint()

    console.log("Made with ❤️  by DT89");
    
}

driverScript();